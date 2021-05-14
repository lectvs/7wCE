const AWS = require('aws-sdk');
const utils = require('./utils');

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.setwonderpreferences = async (username, password_hash, preferences) => {
    
    if (!await utils.validatePasswordHash(dynamo, username, password_hash)) {
        throw new Error('Invalid login');
    }
    
    let ddbresult = await dynamo.get({ TableName: '7wCE_users', Key: { username } }).promise();
    if (!ddbresult.Item) {
        throw new Error('User does not exist');
    }
    
    await dynamo.update({
        TableName : '7wCE_users',
        Key: { username },
        UpdateExpression: 'set wonder_preferences = :wp',
        ExpressionAttributeValues: {
            ':wp': preferences
        }
    }).promise();

    return { result: 'SUCCESS' };
}