var AWS = require('aws-sdk'),
	uuid = require('uuid')


AWS.config.update({ region: "eu-west-2" });
const dynamoDb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
exports.main = function(event, context, callback) {

const params = {
    TableName: "customerRoles",
    FilterExpression: '#userId = :userId',
    ExpressionAttributeNames: {
        '#userId': 'userId',
    },
    ExpressionAttributeValues: {
        ':userId': event.userId,
    }
  };
  dynamoDb.scan(params, (err, data) => {
      if(err) {
         console.log(err);
         callback(null, failure({ status: false }));
      } else {
        const projects = data.Items.map(item => {
          return {
            userId: item.userId,
            roleName: item.roleName,
            updatedAt: item.updatedAt };
        });
        callback(null, success(projects));
      }
    });

}

function success(body) {
  return buildResponse(200, body);
}

function failure(body) {
  return buildResponse(500, body);
}

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: body
  };
}
