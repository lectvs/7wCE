const AWS = require('aws-sdk');
const utils = require('./utils');
const cardData = require('./cardData');
const wonderData = require('./wonderData');
const randomizer = require('./randomizer');

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.creategame = async (players, flags, extraCards) => {
    
    let randomizerEnabled = flags.includes('randomizer');
    let citiesEnabled = flags.includes('cities') || randomizerEnabled;
    let sevenBlundersEnabled = flags.includes('blunders');
    let vanillaWonders = flags.includes('vanilla_wonders');
    let hideDeck = flags.includes('hide_deck');
    
    let baseCards = randomizerEnabled || citiesEnabled ? 8 : 7;
    if (baseCards + extraCards < 2 || baseCards + extraCards > 16) {
        throw new Error(`Invalid extracards: ${extraCards}`);
    }
    
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
    
    let isDebug = isTestGame;
    
    let wonderPreferences = {};
    if (flags.includes('respect_preferences')) {
        wonderPreferences = await getWonderPreferences(players);
    }
    
    let draftOrderPlayers = utils.shuffled(players);
    if (flags.includes('draft_by_elo')) {
        draftOrderPlayers = await getPlayerDraftOrder(players);
    }
    
    let cards;
    let initialHands;
    let deck;
    let wonderChoices;
    if (randomizerEnabled) {
        let deckForAge = {
            '1': randomizer.generateDeckForPlayersAge(players.length, 1, sevenBlundersEnabled, baseCards + extraCards),
            '2': randomizer.generateDeckForPlayersAge(players.length, 2, sevenBlundersEnabled, baseCards + extraCards),
            '3': randomizer.generateDeckForPlayersAge(players.length, 3, sevenBlundersEnabled, baseCards + extraCards),
        };
        
        cards = randomizer.cardsify(deckForAge);

        initialHands = randomizer.getInitialHands(cards, players.length, baseCards + extraCards);

        deck = randomizer.getDecks(cards);

        wonderChoices = {};
        players.forEach(player => {
            wonderChoices[player] = randomizer.getRandomWonderChoices(player, sevenBlundersEnabled)
        });
    } else {
        cards = cardData.getAllCards();
        
        let bonus1 = cardData.getBonusCardsForPlayersAge(players.length, 1, citiesEnabled);
        let bonus2 = cardData.getBonusCardsForPlayersAge(players.length, 2, citiesEnabled);
        let bonus3 = cardData.getBonusCardsForPlayersAge(players.length, 3, citiesEnabled);
        
        let extraBonusCards1 = extraCards > 0 ? (citiesEnabled ? Math.floor(extraCards/2) : 0) : (citiesEnabled ? -Math.min(Math.floor(-extraCards/2), 1) : 0);
        let extraBonusCards2 = extraCards > 0 ? (citiesEnabled ? Math.floor(extraCards/2) : 0) : (citiesEnabled ? -Math.min(Math.floor(-extraCards/2), 1) : 0);
        let extraBonusCards3 = extraCards > 0 ? (Math.floor(extraCards/2)) : -Math.min(Math.floor(-extraCards/2), 1);
        
        let extraCoreCards1 = extraCards - extraBonusCards1;
        let extraCoreCards2 = extraCards - extraBonusCards2;
        let extraCoreCards3 = extraCards - extraBonusCards3;
        
        let core1 = cardData.getCoreCardsForPlayersAge(players.length, 1, citiesEnabled, 7 + extraCoreCards1);
        let core2 = cardData.getCoreCardsForPlayersAge(players.length, 2, citiesEnabled, 7 + extraCoreCards2);
        let core3 = cardData.getCoreCardsForPlayersAge(players.length, 3, citiesEnabled, 7 + extraCoreCards3);
        
        let trimmedBonus1 = cardData.trimBonusCardsForPlayersAge(bonus1, players.length, 1, citiesEnabled, extraBonusCards1);
        let trimmedBonus2 = cardData.trimBonusCardsForPlayersAge(bonus2, players.length, 2, citiesEnabled, extraBonusCards2);
        let trimmedBonus3 = cardData.trimBonusCardsForPlayersAge(bonus3, players.length, 3, citiesEnabled, extraBonusCards3);

        console.log('extra bonus cards:', extraBonusCards1, extraBonusCards2, extraBonusCards3, 'extra core cards:', extraCoreCards1, extraCoreCards2, extraCoreCards3);

        initialHands = {
            '1': cardData.newHandsForPlayersAge(core1, trimmedBonus1, players.length, 1, citiesEnabled),
            '2': cardData.newHandsForPlayersAge(core2, trimmedBonus2, players.length, 2, citiesEnabled),
            '3': cardData.newHandsForPlayersAge(core3, trimmedBonus3, players.length, 3, citiesEnabled),
        };
        
        let deckIdsForAge = {
            '1': cardData.getCoreCardsForPlayersAge(players.length, 1, citiesEnabled),
            '2': cardData.getCoreCardsForPlayersAge(players.length, 2, citiesEnabled),
            '3': cardData.getCoreCardsForPlayersAge(players.length, 3, citiesEnabled),
        };

        deck = {
            '1': convertCardListToCountMap(cardData.buildDeckForPlayersAge(core1, bonus1, players, 1, citiesEnabled)),
            '2': convertCardListToCountMap(cardData.buildDeckForPlayersAge(core2, bonus2, players, 2, citiesEnabled)),
            '3': convertCardListToCountMap(cardData.buildDeckForPlayersAge(core3, bonus3, players, 3, citiesEnabled)),
        };
        
        wonderChoices = wonderData.getWonderChoicesForPlayers(draftOrderPlayers, wonderPreferences, isDebug, vanillaWonders);
    }
    
    
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
            buildFreeWithoutChainUsages: 0,
            hand: []
        };
    }
    
    let gamestate = {
        state: "CHOOSE_WONDER_SIDE",
        citiesEnabled: citiesEnabled,
        sevenBlundersEnabled: sevenBlundersEnabled,
        randomizerEnabled: randomizerEnabled,
        hideDeck: hideDeck,
        discardMoveQueue: [],
        players: orderPlayers(players),  // Randomize player order and balance bots
        host: players[0],
        age: 1,
        turn: 1,
        turnInAge: 1,
        deck: deck,
        initialHands: initialHands,
        playerData: playerData,
        discardedCards: [],
        cards: cards,
        wonderChoices: wonderChoices
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

function orderPlayers(players) {
    let realPlayers = utils.shuffled(players.filter(player => !player.startsWith('BOT')));
    let botPlayers = utils.shuffled(players.filter(player => player.startsWith('BOT')));
    
    if (botPlayers.length === 0) {
        return realPlayers;
    }
    
    let smallerPlayers = realPlayers.length > botPlayers.length ? botPlayers : realPlayers;
    let biggerPlayers = realPlayers.length > botPlayers.length ? realPlayers : botPlayers;
    
    let biggerPlayersForSmallerPlayers = smallerPlayers.map(p => []);
    for (let i = 0; i < biggerPlayers.length; i++) {
        biggerPlayersForSmallerPlayers[i % smallerPlayers.length].push(biggerPlayers[i]);
    }
    
    biggerPlayersForSmallerPlayers = utils.shuffled(biggerPlayersForSmallerPlayers);
    
    let result = [];
    for (let i = 0; i < smallerPlayers.length; i++) {
        result.push(smallerPlayers[i]);
        result.push(...biggerPlayersForSmallerPlayers[i]);
    }
    
    return result;
}