const AWS = require('aws-sdk');
const wonderData = require('./wonderData');

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.getusers = async (usernames) => {
    let ddbresult = await dynamo.batchGet({ RequestItems: { '7wCE_users': { Keys: usernames.map(username => ({ username })) } } }).promise();
    if (!ddbresult || !ddbresult.Responses ||  ddbresult.Responses['7wCE_users'].length === 0) {
        return { users: {} };
    }
    
    let users = {};
    for (let user of ddbresult.Responses['7wCE_users']) {
        let wonderPreferenceIds = user.wonder_preferences ? user.wonder_preferences.split(',') : [];
        user.wonder_preferences = wonderData.idsToWonderPreferences(wonderPreferenceIds);
        
        user.friends = user.friends.split(',');
        
        delete user.password_hash;
        
        users[user.username] = user;
    }
    
    return { users };
}
