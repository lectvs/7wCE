const AWS = require('aws-sdk');
const utils = require('./utils');

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.getgamestate = async (gameid, player, password_hash) => {

    gameid = String(gameid);
    
    if (!await utils.validatePasswordHash(dynamo, player, password_hash)) {
        throw new Error('Invalid login');
    }
    
    let ddbresult = await dynamo.get({ TableName: '7wCE_games', Key: { gameid } }).promise();
    let gamestate = JSON.parse(ddbresult.Item.gamestate);
    
    if (!gamestate.players.includes(player)) {
        throw new Error('Player not in game');
    }

    // Fetch moves
    let gameid_turn_players = [];
    if (gamestate.state === 'CHOOSE_WONDER_SIDE') {
        for (let p in gamestate.playerData) {
            gameid_turn_players.push(`${gameid}_chooseside_${p}`);
        }
    } else {
        for (let p in gamestate.playerData) {
            gameid_turn_players.push(`${gameid}_${gamestate.turn}_${p}`);
            gameid_turn_players.push(`${gameid}_${gamestate.turn-1}_${p}`);
        }
    }

    ddbresult = await dynamo.batchGet({
        RequestItems: {
            '7wCE_moves': {
                Keys: gameid_turn_players.map(gameid_turn_player => {
                    return { gameid_turn_player };
                })
            }
        }
    }).promise();
    
    // Set current and last moves
    for (let item of ddbresult.Responses['7wCE_moves']) {
        let [gameid, turn, p] = item.gameid_turn_player.split('_');
        if (turn == gamestate.turn-1) {
            gamestate.playerData[p].lastMove = JSON.parse(item.move);
        } else {
            if (p === player) {
                gamestate.playerData[p].currentMove = JSON.parse(item.move);
            } else {
                gamestate.playerData[p].currentMove = {};
            }
        }
    }
    
    if (gamestate.state !== 'CHOOSE_WONDER_SIDE') {
        // Get valid moves
        gamestate.validMoves = utils.getValidMoves(gamestate, player);
        
        // Only provide current player's hand
        gamestate.hand = gamestate.playerData[player].hand;
        for (let p in gamestate.playerData) {
            gamestate.playerData[p].handCount = gamestate.playerData[p].hand.length;
            delete gamestate.playerData[p].hand;
        }
        
        // Compute points distribution
        for (let p in gamestate.playerData) {
            gamestate.playerData[p].pointsDistribution = utils.computePointsDistribution(gamestate, p);
        }
        
        // Helper: list all last-card-players
        gamestate.lastCardPlayers = (gamestate.state === 'LAST_CARD_MOVE') ? gamestate.players.filter(player => utils.hasEffect(utils.getAllWonderEffects(gamestate, player), 'play_last_card')) : [];
        
        // Helper: list all gold-loss-players
        gamestate.chooseGoldToLosePlayers = (gamestate.state === 'CHOOSE_GOLD_TO_LOSE') ? gamestate.players.filter(player => gamestate.playerData[player].goldToLose > 0) : [];
        
        // Helper: list all players' shield counts
        for (let p in gamestate.playerData) {
            gamestate.playerData[p].totalShields = utils.getShields(utils.getAllEffects(gamestate, p));
        }
        
        // Helper: determine points counts for certain cards (guilds)
        for (let p in gamestate.playerData) {
            let cardPoints = {};
            for (let cardId of gamestate.playerData[p].playedCards) {
                let card = gamestate.cards[cardId];
                if (card.color !== 'purple' || cardId === 58) continue;  // Only compute points for guilds, except Scientists
                cardPoints[cardId] = utils.computePointsForCard(gamestate, p, card);
            }
            gamestate.playerData[p].cardPoints = cardPoints;
        }
    }

    // Hide initial hands
    delete gamestate.initialHands;
    
    // Hide discarded cards unless it is player is building from the discard
    gamestate.discardedCardCount = gamestate.discardedCards.length;
    if (gamestate.discardedCardCount > 0) {
        gamestate.lastDiscardedCardAge = gamestate.cards[gamestate.discardedCards[gamestate.discardedCards.length-1]].age;
    }
    if (gamestate.state !== 'DISCARD_MOVE' || gamestate.discardMoveQueue[0] !== player) {
        delete gamestate.discardedCards;
    }

    return gamestate;
}