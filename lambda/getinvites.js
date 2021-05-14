const AWS = require('aws-sdk');
const utils = require('./utils');

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.getinvites = async (player) => {

    let ddbresult = await dynamo.scan({
        TableName: '7wCE_invites',
        FilterExpression: 'player = :player',
        ExpressionAttributeValues: {
            ':player': player
        }
    }).promise();
    
    if (!ddbresult || !ddbresult.Items || ddbresult.Items.length === 0) {
        return { gameids: [] };
    }

    let gameids = ddbresult.Items.map(item => item.gameid);
    
    ddbresult = await dynamo.batchGet({ RequestItems: { '7wCE_games': { Keys: gameids.map(gameid => ({ gameid })) } } }).promise();

    if (!ddbresult || !ddbresult.Responses ||  ddbresult.Responses['7wCE_games'].length === 0) {
        return { gameids: [] };
    }
    
    let gameids_states = ddbresult.Responses['7wCE_games'].map(response => ({ gameid: response.gameid, state: JSON.parse(response.gamestate).state }));
    

    return { gameids: gameids_states.filter(gis => gis.state !== 'GAME_COMPLETE').map(gis => gis.gameid) };
}