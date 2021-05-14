const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.getmovehistory = async (gameid, player) => {

    gameid = String(gameid);
    let ddbresult = await dynamo.get({ TableName: '7wCE_games', Key: { gameid } }).promise();
    let gamestate = JSON.parse(ddbresult.Item.gamestate);
    
    if (!gamestate.players.includes(player)) {
        throw new Error('Player not in game');
    }
    
    let gameid_turn_players = [];
    for (let turn = 1; turn < gamestate.turn; turn++) {
        for (let player of gamestate.players) {
            let gameid_turn_player = `${gameid}_${turn}_${player}`;
            gameid_turn_players.push({ gameid_turn_player });
        }
    }
    
    // Fetch moves
    ddbresult = await dynamo.batchGet({ RequestItems: { '7wCE_moves': { Keys: gameid_turn_players } } }).promise();
    
    let turns = {};
    for (let item of ddbresult.Responses['7wCE_moves']) {
        let [gameid, turn, player] = item.gameid_turn_player.split('_');
        if (!turns[turn]) turns[turn] = {};
        turns[turn][player] = JSON.parse(item.move);
    }

    return turns;
}