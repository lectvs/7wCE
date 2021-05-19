const AWS = require('aws-sdk');
const utils = require('./utils');
const cardData = require('./cardData');
const wonderData = require('./wonderData');

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.creategame = async (players, flags) => {
    
    let isTestGame = flags.includes('test');
    
    // Generate a new gameid
    let gameid;
    do {
        let prefix = isTestGame ? 'T' : '';
        gameid = `${prefix}${utils.randInt(1000, 9999)}`;
    } while ((await dynamo.get({ TableName: '7wCE_games', Key: { gameid } }).promise()).Item);
    console.log(`Generated new gameid: ${gameid}`);

    if (players.length < 3 || players.length > 7) {
        throw new Error(`Invalid player count: ${players.length}`);
    }

    for (let i = 0; i < players.length; i++) {
        for (let j = i+1; j < players.length; j++) {
            if (players[i] === players[j]) {
                throw new Error(`Duplicate player: ${players[i]}`);
            }
        }
    }
    
    let isDebug = false;
    
    let wonderPreferences = {};
    if (flags.includes('respect_preferences')) {
        wonderPreferences = await getWonderPreferences(players);
    }
    
    let draftOrderPlayers = utils.shuffled(players);
    if (flags.includes('draft_by_elo')) {
        draftOrderPlayers = await getPlayerDraftOrder(players);
    }
    
    let citiesEnabled = flags.includes('cities');
    
    let initialHands = {
        '1': cardData.newHandsForPlayersAge(players.length, 1, citiesEnabled),
        '2': cardData.newHandsForPlayersAge(players.length, 2, citiesEnabled),
        '3': cardData.newHandsForPlayersAge(players.length, 3, citiesEnabled),
    };
    
    let deck = {
        '1': convertCardListToCountMap(cardData.getCardsForPlayersAge(players.length, 1, citiesEnabled)),
        '2': convertCardListToCountMap(cardData.getCardsForPlayersAge(players.length, 2, citiesEnabled)),
        '3': convertCardListToCountMap(cardData.getCardsForPlayersAge(players.length, 3, citiesEnabled)),
    };
    
    let playerData = {};
    for (let i = 0; i < players.length; i++) {
        playerData[players[i]] = {
            gold: 3,
            playedCards: [],
            stagesBuilt: [],
            militaryTokens: [],
            debtTokens: 0,
            diplomacyTokens: 0,
            goldToLose: 0,
            zeusUsed: false,
            hand: []
        };
    }
    
    let gamestate = {
        state: "CHOOSE_WONDER_SIDE",
        citiesEnabled: citiesEnabled,
        discardMoveQueue: [],
        players: utils.shuffled(players),  // Randomize player order
        host: players[0],
        age: 1,
        turn: 1,
        turnInAge: 1,
        deck: deck,
        initialHands: initialHands,
        playerData: playerData,
        discardedCards: [],
        cards: cardData.getAllCards(),
        wonderChoices: wonderData.getWonderChoicesForPlayers(draftOrderPlayers, wonderPreferences, isDebug)
    };
    
    // Make sure another game hasn't been created recently.
    if (!isTestGame) {
        await verifyGameNotCreated(players);
    }

    await dynamo.put({
        TableName : '7wCE_games',
        Item: {
            gameid: gameid,
            gamestate: JSON.stringify(gamestate),
            createtime: utils.currentTime(),
            players: players,
            flags: flags,
        }
    }).promise();
    
    // Send invites
    await dynamo.batchWrite({
        RequestItems: {
            '7wCE_invites': players.map(player => ({
                PutRequest: {
                    Item: {
                        id: utils.uid(),
                        player: player,
                        gameid: gameid,
                        expiration: utils.currentTime() + 300,  // 5 minutes from now
                    }
                }
            }))
        }
    }).promise();

    
    return { gameid };
}

async function getWonderPreferences(players) {
    let keys = players.map(player => ({ username: player }));
    let ddbresult = await dynamo.batchGet({ RequestItems: { '7wCE_users': { Keys: keys } } }).promise();
    let result = {};
    for (let response of ddbresult.Responses['7wCE_users']) {
        result[response.username] = response.wonder_preferences.split(',').map(r => r.trim());
    }
    return result;
}

async function getPlayerDraftOrder(players) {
    let ddbresult = await dynamo.batchGet({ RequestItems: { '7wCE_users': { Keys: players.map(username => ({ username })) } } }).promise();
    if (!ddbresult || !ddbresult.Responses ||  ddbresult.Responses['7wCE_users'].length === 0) {
        return utils.shuffled(players);
    }

    let playersToElo = {};
    for (let user of ddbresult.Responses['7wCE_users']) {
        playersToElo[user.username] = user.elo;
    }
    
    let playersLeft = utils.cloneArray(players);
    let order = [];
    for (let player in playersToElo) {
        order.push(player);
        playersLeft.splice(playersLeft.indexOf(player), 1);
    }
    
    order.sort((p1,p2) => playersToElo[p1] - playersToElo[p2]);
    order.push(...utils.shuffled(playersLeft));
    return order;
}

function convertCardListToCountMap(cardList) {
    let result = [];
    for (let card of cardList) {
        let e = result.find(r => r.id === card);
        if (e) {
            e.count++;
        } else {
            result.push({ id: card, count: 1 });
        }
    }
    let cards = cardData.getAllCards();
    result.sort((e,f) => {
        let eguild = cards[e.id].color === 'purple';
        let fguild = cards[f.id].color === 'purple';
        let eblack = cards[e.id].color === 'black';
        let fblack = cards[f.id].color === 'black';
        if (eblack && !fblack) return 1;
        if (!eblack && fblack) return -1;
        if (eguild && !fguild) return 1;
        if (!eguild && fguild) return -1;
        return e.id - f.id;
    });
    return result;
}

async function verifyGameNotCreated(players) {
    let ddbresult = await dynamo.scan({
        TableName: '7wCE_invites',
        FilterExpression: 'player = :player',
        ExpressionAttributeValues: {
            ':player': players[0]
        }
    }).promise();
    
    if (!ddbresult || !ddbresult.Items || ddbresult.Items.length === 0) {
        return;
    }

    let gameids = ddbresult.Items.map(item => item.gameid);
    
    ddbresult = await dynamo.batchGet({ RequestItems: { '7wCE_games': { Keys: gameids.map(gameid => ({ gameid })) } } }).promise();

    if (!ddbresult || !ddbresult.Responses ||  ddbresult.Responses['7wCE_games'].length === 0) {
        return;
    }
    
    for (let response of ddbresult.Responses['7wCE_games']) {
        if (utils.currentTime() - response.createtime < 10) {
            throw new Error('Game already created');
        }
    }
}