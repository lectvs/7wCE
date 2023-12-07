const AWS = require('aws-sdk');
const utils = require('./utils');

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.updategame = async (gameid) => {

    gameid = String(gameid);
    
    let ddbresult = await dynamo.get({ TableName: '7wCE_games', Key: { gameid } }).promise();
    let gamestate = JSON.parse(ddbresult.Item.gamestate);
    
    if (gamestate.state === 'GAME_COMPLETE') {
        throw new Error('Game is complete');
    }
    
    // Fetch moves
    let turn = gamestate.state === 'CHOOSE_WONDER_SIDE' ? 'chooseside' : gamestate.turn;
    ddbresult = await dynamo.batchGet({
        RequestItems: {
            '7wCE_moves': {
                Keys: gamestate.players.map(player => {
                    let gameid_turn_player = `${gameid}_${turn}_${player}`;
                    return { gameid_turn_player };
                })
            }
        }
    }).promise();
    
    let movesByPlayer = {};
    let latestMoveTime = 0;
    for (let item of ddbresult.Responses['7wCE_moves']) {
        let player = item.gameid_turn_player.split('_').pop();
        movesByPlayer[player] = JSON.parse(item.move);
        latestMoveTime = Math.max(latestMoveTime, item.createtime || 0);
    }
    
    // No update if latest move occurred less than a second ago.
    if (latestMoveTime > 0 && utils.currentTime() - latestMoveTime <= 1) {
        return { result: 'NO_UPDATE' };
    }
    
    // Only update if all required players have moved
    let allPlayersMoved = true;
    if (gamestate.state === 'CHOOSE_WONDER_SIDE') {
        for (let player of gamestate.players) {
            if (!movesByPlayer[player]) allPlayersMoved = false;
        }
    } else if (gamestate.state === 'CHOOSE_GOLD_TO_LOSE') {
        for (let player of gamestate.players) {
            if (gamestate.playerData[player].goldToLose <= 0) continue;
            if (!movesByPlayer[player]) allPlayersMoved = false;
        }
    } else if (gamestate.state === 'SEE_FUTURE') {
        for (let player of gamestate.players) {
            if (!gamestate.playerData[player].seeFutureCards) continue;
            if (!movesByPlayer[player]) allPlayersMoved = false;
        }
    } else if (gamestate.state === 'NORMAL_MOVE') {
        for (let player of gamestate.players) {
            if (!movesByPlayer[player]) allPlayersMoved = false;
        }
    } else if (gamestate.state === 'LAST_CARD_MOVE') {
        for (let player of gamestate.players) {
            if (!utils.hasEffect(utils.getAllEffects(gamestate, player), 'play_last_card')) continue;
            if (!movesByPlayer[player]) allPlayersMoved = false;
        }
    } else if (gamestate.state === 'DISCARD_MOVE') {
        let player = gamestate.discardMoveQueue[0];
        if (!movesByPlayer[player]) allPlayersMoved = false;
    }

    if (!allPlayersMoved) {
        return { result: 'NO_UPDATE' };
    }
    
    for (let player in movesByPlayer) {
        if (movesByPlayer[player].action === 'reject') {
            delete movesByPlayer[player];
        }
    }
    
    // Choose wonder side and start game
    if (gamestate.state === 'CHOOSE_WONDER_SIDE') {
        updateChooseSide(gamestate, movesByPlayer);
    } else if (gamestate.state === 'CHOOSE_GOLD_TO_LOSE') {
        updateChooseGoldToLoseMoves(gamestate, movesByPlayer);
        updatePostMove(gamestate);
    } else if (gamestate.state === 'SEE_FUTURE') {
        updateSeeFutureMoves(gamestate, movesByPlayer);
        updatePostMove(gamestate);
    } else {
        updateGameMoves(gamestate, movesByPlayer);
        updatePostMove(gamestate);
    }
    
    if (gamestate.state === 'GAME_COMPLETE') {
        await updateElos(gamestate);
    }

    
    await dynamo.update({
        TableName : '7wCE_games',
        Key: { gameid },
        UpdateExpression: 'set gamestate = :gamestate',
        ExpressionAttributeValues: {
            ':gamestate': JSON.stringify(gamestate)
        }
    }).promise();

    return { result: 'SUCCESS' };
}

function updateChooseSide(gamestate, movesByPlayer) {
    gamestate.wonders = {};
    for (let player in movesByPlayer) {
        let side = movesByPlayer[player].side;
        console.log(gamestate.wonders, gamestate.wonderChoices, player, side)
        gamestate.wonders[player] = gamestate.wonderChoices[player][side];
        
        // Apply immediate starting effects
        for (let effect of gamestate.wonders[player].starting_effects) {
            utils.applyImmediateEffect(gamestate, player, effect, []);
        }
    }
    delete gamestate.wonderChoices;
    
    gamestate.age = 1;
    gamestate.turnInAge = 1;
    gamestate.state = 'NORMAL_MOVE';
    let hands = gamestate.initialHands[gamestate.age];
    for (let i = 0; i < gamestate.players.length; i++) {
        let player = gamestate.players[i];
        gamestate.playerData[player].hand = hands[i];
    }
    
    for (let player of gamestate.players) {
        if (gamestate.playerData[player].seeFutureCards) {
            gamestate.state = 'SEE_FUTURE';
        }
    }
}

function updateGameMoves(gamestate, movesByPlayer) {
    // Reset player data
    for (let player of gamestate.players) {
        gamestate.playerData[player].gainedMilitaryTokensFromConflict = [];
        gamestate.playerData[player].goldToLose = 0;
    }
    
    // Perform all card actions
    let playedEffectsByPlayer = {};
    for (let player in movesByPlayer) {
        let move = movesByPlayer[player];
        let playerData = gamestate.playerData[player];
        playedEffectsByPlayer[player] = [];
        utils.performPayment(gamestate, player, move);
        if (gamestate.state === 'DISCARD_MOVE') {
            let card = gamestate.cards[move.card];
            playerData.playedCards.push(move.card);
            playedEffectsByPlayer[player].push(...card.effects);
            gamestate.discardedCards.splice(gamestate.discardedCards.indexOf(move.card), 1);
        } else if (move.action === 'play') {
            let card = gamestate.cards[move.card];
            playerData.playedCards.push(move.card);
            playedEffectsByPlayer[player].push(...card.effects);
            playerData.hand.splice(playerData.hand.indexOf(move.card), 1);
        } else if (move.action === 'wonder') {
            let card = gamestate.cards[move.card];
            let stageBuilt = { stage: move.stage, cardAge: card.age, copyPlayer: move.copyPlayer, copyStage: move.copyStage };
            playerData.stagesBuilt.push(stageBuilt);
            let stage = utils.resolveStage(gamestate, player, stageBuilt);
            playedEffectsByPlayer[player].push(...stage.effects);
            playerData.hand.splice(playerData.hand.indexOf(move.card), 1);
        } else {
            gamestate.discardedCards.push(move.card);
            playerData.gold += 3;
            playerData.hand.splice(playerData.hand.indexOf(move.card), 1);
        }
    }
    
    if (gamestate.state === 'DISCARD_MOVE') {
        gamestate.discardMoveQueue.shift();
    }
    
    // Apply all immediate effects
    let discardPlays = [];
    for (let player in playedEffectsByPlayer) {
        for (let effect of playedEffectsByPlayer[player]) {
            utils.applyImmediateEffect(gamestate, player, effect, discardPlays);
        }
    }
    
    discardPlays = utils.shuffled(discardPlays);
    discardPlays.sort((play1, play2) => play2.priority - play1.priority);
    gamestate.discardMoveQueue.push(...discardPlays.map(play => play.player));
}

function updateChooseGoldToLoseMoves(gamestate, movesByPlayer) {
    for (let player in movesByPlayer) {
        let move = movesByPlayer[player];
        let playerData = gamestate.playerData[player];
        playerData.gold -= move.gold_to_lose;
        playerData.debtTokens += playerData.goldToLose - move.gold_to_lose;
        playerData.goldToLose = 0;
    }
}

function updateSeeFutureMoves(gamestate, movesByPlayer) {
    for (let player in movesByPlayer) {
        let move = movesByPlayer[player];
        let playerData = gamestate.playerData[player];
        playerData.seeFutureCards = undefined;
    }
}

function updatePostMove(gamestate) {
    // Perform end of turn stuff
    let endOfAge = true;
    for (let player of gamestate.players) {
        if (gamestate.playerData[player].hand.length >= 2) endOfAge = false;
    }

    if (endOfAge) {
        // Discard remaining cards
        for (let player of gamestate.players) {
            if (utils.hasEffect(utils.getAllEffects(gamestate, player), 'play_last_card')) continue;
            gamestate.discardedCards.push(...gamestate.playerData[player].hand);
            gamestate.playerData[player].hand = [];
        }
    }
    
    let needChooseGoldToLose = false;
    for (let player of gamestate.players) {
        if (gamestate.playerData[player].goldToLose > 0) needChooseGoldToLose = true;
    }
    
    let needSeeFuture = false;
    for (let player of gamestate.players) {
        if (gamestate.playerData[player].seeFutureCards) needSeeFuture = true;
    }
    
    let needLastPlay = false;
    for (let player of gamestate.players) {
        if (gamestate.playerData[player].hand.length === 1) needLastPlay = true;
    }
    
    let needDiscardPlay = gamestate.discardMoveQueue.length > 0;
    
    if (gamestate.state === 'SEE_FUTURE' && gamestate.turn === 1) {
        // Do nothing if we are coming from a turn-1 (start of game) see-future.
        gamestate.state = 'NORMAL_MOVE';
    } else if (needChooseGoldToLose) {
        gamestate.state = 'CHOOSE_GOLD_TO_LOSE';
    } else if (needSeeFuture) {
        gamestate.state = 'SEE_FUTURE';
    } else if (needLastPlay) {
        gamestate.state = 'LAST_CARD_MOVE';
    } else if (needDiscardPlay) {
        gamestate.state = 'DISCARD_MOVE';
    } else if (endOfAge) {
        // Determine who is fighting
        let fightingPlayers = [];
        let diplomacyPlayers = [];
        for (let player of gamestate.players) {
            if (gamestate.playerData[player].diplomacyTokens > 0) {
                gamestate.playerData[player].diplomacyTokens--;
                diplomacyPlayers.push(player);
            } else {
                fightingPlayers.push(player);
            }
        }
        gamestate.fightingPlayers = fightingPlayers;
        gamestate.diplomacyPlayers = diplomacyPlayers;
        
        // Military conflicts
        let ageToVictoryTokenPoints = { 1: 1, 2: 3, 3: 5 };
        if (fightingPlayers.length < 2) {
            // No military conflicts
        } else if (fightingPlayers.length === 2) {
            let player1 = fightingPlayers[0];
            let player2 = fightingPlayers[1];
            let shields1 = utils.getShields(gamestate, player1);
            let shields2 = utils.getShields(gamestate, player2);
            if (shields1 > shields2) {
                gamestate.playerData[player1].gainedMilitaryTokensFromConflict.push(ageToVictoryTokenPoints[gamestate.age], ageToVictoryTokenPoints[gamestate.age]);
                gamestate.playerData[player2].gainedMilitaryTokensFromConflict.push(-1, -1);
            } else if (shields1 < shields2) {
                gamestate.playerData[player1].gainedMilitaryTokensFromConflict.push(-1, -1);
                gamestate.playerData[player2].gainedMilitaryTokensFromConflict.push(ageToVictoryTokenPoints[gamestate.age], ageToVictoryTokenPoints[gamestate.age]);
            }
        } else {
            for (let i = 0; i < fightingPlayers.length; i++) {
                let player = fightingPlayers[i];
                let negPlayer = i === 0 ? fightingPlayers[fightingPlayers.length-1] : fightingPlayers[i-1];
                let shields = utils.getShields(gamestate, player);
                let negShields = utils.getShields(gamestate, negPlayer);
                if (shields > negShields) {
                    gamestate.playerData[player].gainedMilitaryTokensFromConflict.push(ageToVictoryTokenPoints[gamestate.age]);
                    gamestate.playerData[negPlayer].gainedMilitaryTokensFromConflict.push(-1);
                } else if (shields < negShields) {
                    gamestate.playerData[player].gainedMilitaryTokensFromConflict.push(-1);
                    gamestate.playerData[negPlayer].gainedMilitaryTokensFromConflict.push(ageToVictoryTokenPoints[gamestate.age]);
                }
            }
        }
        
        for (let player of gamestate.players) {
            gamestate.playerData[player].militaryTokens.push(...gamestate.playerData[player].gainedMilitaryTokensFromConflict);
        }
        
        // Set up new age
        if (gamestate.age === 3) {
            gamestate.state = 'GAME_COMPLETE';
        } else {
            gamestate.age++;
            gamestate.turnInAge = 1;
            gamestate.state = 'NORMAL_MOVE';
            for (let player of gamestate.players) {
                gamestate.playerData[player].zeusUsed = false;
            }
            let hands = gamestate.initialHands[gamestate.age];
            for (let i = 0; i < gamestate.players.length; i++) {
                let player = gamestate.players[i];
                gamestate.playerData[player].hand = hands[i];
            }
        }
    } else {
        // Rotate hands
        let hands = gamestate.players.map(player => gamestate.playerData[player].hand);
        if (gamestate.age % 2 == 0) {
            hands.push(hands.shift());  // Age 2
        } else {
            hands.unshift(hands.pop()); // Age 1,3
        }
        
        for (let i = 0; i < hands.length; i++) {
            gamestate.playerData[gamestate.players[i]].hand = hands[i];
        }
        
        gamestate.state = 'NORMAL_MOVE';
        gamestate.turnInAge++;
    }
    
    gamestate.turn++;
}

async function updateElos(gamestate) {
    let ddbresult = await dynamo.batchGet({ RequestItems: { '7wCE_users': { Keys: gamestate.players.map(player => ({ username: player })) } } }).promise();
    if (!ddbresult || !ddbresult.Responses ||  ddbresult.Responses['7wCE_users'].length === 0) {
        return {};
    }
    
    let elosByPlayer = {};
    for (let response of ddbresult.Responses['7wCE_users']) {
        elosByPlayer[response.username] = { before: response.elo };
    }
    
    let playersFactor = {
        1: 0,
        2: 1,
        3: 3/4,
        4: 2/3,
        5: 1/2,
        6: 2/5,
        7: 1/3
    }[Object.keys(elosByPlayer).length];
    
    for (let p1 in elosByPlayer) {
        elosByPlayer[p1].diff = 0;
        for (let p2 in elosByPlayer) {
            if (p1 === p2) continue;
            let elo1 = elosByPlayer[p1].before;
            let elo2 = elosByPlayer[p2].before;
            let result = utils.getScoreResultForElo(gamestate, p1, p2);
            elosByPlayer[p1].diff += utils.computeEloDiff(gamestate, elo1, elo2, result);
        }
        elosByPlayer[p1].diff *= playersFactor;
        let eloMultiplier = utils.getEloMultiplier(gamestate);
        if (utils.computePointsDistribution(gamestate, p1).total === 69) {  // Nice
            if (gamestate.playerData[p1].gold === 69) {
                elosByPlayer[p1].diff += 69 * eloMultiplier;
            } else {
                elosByPlayer[p1].diff += 6.9 * eloMultiplier;
            }
        }
        elosByPlayer[p1].after = elosByPlayer[p1].before + elosByPlayer[p1].diff;

        await dynamo.update({
            TableName : '7wCE_users',
            Key: { username: p1 },
            UpdateExpression: 'set elo = :elo',
            ExpressionAttributeValues: {
                ':elo': elosByPlayer[p1].after
            }
        }).promise();
        
        gamestate.playerData[p1].elo = elosByPlayer[p1];
    }
}