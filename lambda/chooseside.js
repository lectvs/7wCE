const AWS = require('aws-sdk');
const utils = require('./utils');

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.chooseside = async (gameid, player, password_hash, side) => {

    gameid = String(gameid);
    
    if (!await utils.validatePasswordHash(dynamo, player, password_hash)) {
        throw new Error('Invalid login');
    }
    
    let ddbresult = await dynamo.get({ TableName: '7wCE_games', Key: { gameid } }).promise();
    let gamestate = JSON.parse(ddbresult.Item.gamestate);
    
    if (!gamestate.players.includes(player)) {
        throw new Error('Player not in game');
    }
    
    if (gamestate.state !== 'CHOOSE_WONDER_SIDE') {
        throw new Error("INVALID_MOVE");
    }
    
    if (side < 0 || side >= gamestate.wonderChoices[player].length) {
        throw new Error("INVALID_MOVE");
    }
    
    await dynamo.put({
        TableName : '7wCE_moves',
        Item: {
            gameid_turn_player: `${gameid}_chooseside_${player}`,
            move: JSON.stringify({ side })
        }
    }).promise();

    return { result: 'SUCCESS' };
}