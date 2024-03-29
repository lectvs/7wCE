const AWS = require('aws-sdk');
const utils = require('./utils');

const dynamo = new AWS.DynamoDB.DocumentClient();

function getFullPayment(move) {
    return {
        pos: move.payment.pos || 0,
        neg: move.payment.neg || 0,
        bank: move.payment.bank || 0,
        free_with_zeus: move.payment.free_with_zeus || false,
        free_with_delphoi: move.payment.free_with_delphoi || false,
    };
}

exports.submitmove = async (gameid, turn, player, password_hash, move) => {

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
    
    if (gamestate.state === 'GAME_COMPLETE' || gamestate.state === 'CHOOSE_WONDER_SIDE' || gamestate.state === 'CHOOSE_GOLD_TO_LOSE') {
        throw new Error("INVALID_MOVE");
    }

    let validMoves = utils.getValidMoves(gamestate, player);
    
    let isMoveValid = false;
    for (let validMove of validMoves) {
        if (move.action !== validMove.action) continue;
        if (move.card !== validMove.card) continue;
        if (move.stage !== validMove.stage) continue;
        if (move.copyPlayer !== validMove.copyPlayer) continue;
        if (move.copyStage !== validMove.copyStage) continue;
        
        let payment = getFullPayment(move);
        let validPayment = getFullPayment(validMove);

        if (payment.pos !== validPayment.pos) continue;
        if (payment.neg !== validPayment.neg) continue;
        if (payment.bank !== validPayment.bank) continue;
        if (payment.free_with_zeus !== validPayment.free_with_zeus) continue;
        if (payment.free_with_delphoi !== validPayment.free_with_delphoi) continue;
        
        isMoveValid = true;
    }
    
    if (!isMoveValid) {
        throw new Error("INVALID_MOVE");
    }
    
    await dynamo.put({
        TableName : '7wCE_moves',
        Item: {
            gameid_turn_player: `${gameid}_${turn}_${player}`,
            move: JSON.stringify(move),
            createtime: utils.currentTime()
        }
    }).promise();

    return { result: 'SUCCESS' };
}