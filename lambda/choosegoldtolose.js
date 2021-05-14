const AWS = require('aws-sdk');
const utils = require('./utils');

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.choosegoldtolose = async (gameid, turn, player, password_hash, gold_to_lose) => {

    gameid = String(gameid);
    turn = String(turn);
    
    if (!await utils.validatePasswordHash(dynamo, player, password_hash)) {
        throw new Error('Invalid login');
    }
    
    let ddbresult = await dynamo.get({ TableName: '7wCE_games', Key: { gameid } }).promise();
    let gamestate = JSON.parse(ddbresult.Item.gamestate);
    
    if (!gamestate.players.includes(player)) {
        throw new Error('Player not in game');
    }
    
    if (turn != gamestate.turn) {
        throw new Error("Turn differs from the game's turn");
    }
    
    if (gamestate.state !== 'CHOOSE_GOLD_TO_LOSE') {
        throw new Error("INVALID_MOVE");
    }
    
    let playerGold = gamestate.playerData[player].gold;
    let maxGoldToLose = gamestate.playerData[player].goldToLose;
    if (gold_to_lose === undefined || gold_to_lose < 0 || gold_to_lose > maxGoldToLose || gold_to_lose > playerGold) {
        throw new Error("INVALID_MOVE");
    }
    
    await dynamo.put({
        TableName : '7wCE_moves',
        Item: {
            gameid_turn_player: `${gameid}_${turn}_${player}`,
            move: JSON.stringify({ gold_to_lose })
        }
    }).promise();

    return { result: 'SUCCESS' };
}