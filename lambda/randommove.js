const AWS = require('aws-sdk');
const utils = require('./utils');
const getvalidmoves = require('./getvalidmoves').getvalidmoves;
const submitmove = require('./submitmove').submitmove;
const updategame = require('./updategame').updategame;

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.randommove = async (gameid) => {

    gameid = String(gameid);
    let ddbresult = await dynamo.get({ TableName: '7wCE_games', Key: { gameid } }).promise();
    let gamestate = JSON.parse(ddbresult.Item.gamestate);
    
    for (let player of gamestate.players) {
        let validMoves = (await getvalidmoves(gameid, gamestate.turn, player)).validMoves;
        let move = validMoves[utils.randInt(0, validMoves.length-1)];
        
        for (let validMove of validMoves) {
            if (validMove.action === 'wonder') {
                if (gamestate.wonders[player].name !== 'Halikarnassos' || gamestate.playerData[player].hand.length === 2) {
                    move = validMove;
                    break;
                }
            }
            if (validMove.action === 'play') {
                if ([0, 1, 6].includes(validMove.card)) {
                    move = validMove;
                    break;
                }
            }
        }
        
        await submitmove(gameid, gamestate.turn, player, move);
    }
    
    await updategame(gameid);
    
    ddbresult = await dynamo.get({ TableName: '7wCE_games', Key: { gameid }, ProjectionExpression: 'gamestate' }).promise();
    return JSON.parse(ddbresult.Item.gamestate)
}