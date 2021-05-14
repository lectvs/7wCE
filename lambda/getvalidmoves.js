const AWS = require('aws-sdk');
const utils = require('./utils');

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.getvalidmoves = async (gameid, turn, player, password_hash) => {

    gameid = String(gameid);
    turn = String(turn);
    
    if (!await utils.validatePasswordHash(dynamo, player, password_hash)) {
        throw new Error('Invalid login');
    }
    
    let ddbresult = await dynamo.get({ TableName: '7wCE_games', Key: { gameid } }).promise();
    let gamestate = JSON.parse(ddbresult.Item.gamestate);
    
    if (gamestate.state === 'GAME_COMPLETE') {
        throw new Error('Game is complete');
    }
    
    if (!gamestate.players.includes(player)) {
        throw new Error('Player not in game');
    }
    
    if (turn != gamestate.turn) {
        throw new Error("Turn differs from the game's turn");
    }

    let validMoves = utils.getValidMoves(gamestate, player);

    return { validMoves };
}