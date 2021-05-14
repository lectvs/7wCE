const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.login = async (username, password_hash) => {
    
    let ddbresult = await dynamo.get({ TableName: '7wCE_users', Key: { username } }).promise();
    if (!ddbresult.Item) {
        throw new Error('Invalid username/password combination');
    }
    let user = ddbresult.Item;
    
    if (!user.password_hash) {
        await dynamo.update({
            TableName : '7wCE_users',
            Key: { username },
            UpdateExpression: 'set password_hash = :pwh',
            ExpressionAttributeValues: {
                ':pwh': password_hash
            }
        }).promise();
        return { result: 'SUCCESS' };
    }
    
    if (user.password_hash !== password_hash) {
        throw new Error('Invalid username/password combination');
    }
    
    return { result: 'SUCCESS' };
}