const AWS = require('aws-sdk');
const utils = require('./utils');

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.cleanup = async () => {
    
    // Delete stale games
    let items = [];
    let lastEvaluatedKey = undefined;
    do {
        let ddbresult = await dynamo.scan({ TableName: '7wCE_games', ExclusiveStartKey: lastEvaluatedKey }).promise();
        items.push(...ddbresult.Items);
        lastEvaluatedKey = ddbresult.LastEvaluatedKey;
    } while (lastEvaluatedKey);
    
    let allGameids = items.map(item => item.gameid);
    
    let gameidsToCleanup = [];
    for (let item of items) {
        let gameid = item.gameid;
        let gamestate = JSON.parse(item.gamestate);
        let createtime = item.createtime;
        let flags = item.flags;
        
        if (flags && flags.includes('test')) {
            // All test games should be cleaned up.
            gameidsToCleanup.push(gameid);
            continue;
        }
        
        // Skip all games created in the past hour
        if (createtime && utils.currentTime() < createtime + 3600) continue;
        
        // Skip completed games
        if (gamestate.state === 'GAME_COMPLETE') continue;
        
        gameidsToCleanup.push(gameid);
    }
    
    let batchedGameidsToCleanup = utils.batchArray(gameidsToCleanup, 25);
    
    for (let batch of batchedGameidsToCleanup) {
        await dynamo.batchWrite({
            RequestItems: {
                '7wCE_games': batch.map(gameid => ({
                    DeleteRequest: {
                        Key: { gameid }
                    }
                }))
            }
        }).promise();
    }
    
    // Delete orphan moves
    items = [];
    lastEvaluatedKey = undefined;
    do {
        let ddbresult = await dynamo.scan({ TableName: '7wCE_moves', ExclusiveStartKey: lastEvaluatedKey }).promise();
        items.push(...ddbresult.Items);
        lastEvaluatedKey = ddbresult.LastEvaluatedKey;
    } while (lastEvaluatedKey);
    
    let movesToCleanup = [];
    for (let item of items) {
        let gameid_turn_player = item.gameid_turn_player;
        let [gameid, turn, player] = gameid_turn_player.split('_');
        if (!allGameids.includes(gameid) || gameidsToCleanup.includes(gameid)) {
            movesToCleanup.push(gameid_turn_player);
        }
    }
    
    let batchedMovesToCleanup = utils.batchArray(movesToCleanup, 25);
     
    for (let batch of batchedMovesToCleanup) {
        await dynamo.batchWrite({
            RequestItems: {
                '7wCE_moves': batch.map(gameid_turn_player => ({
                    DeleteRequest: {
                        Key: { gameid_turn_player }
                    }
                }))
            }
        }).promise();
    }
    
    return {
        result: 'SUCCESS',
        gamesDeleted: gameidsToCleanup.length,
        movesDeleted: movesToCleanup.length,
    };
}
