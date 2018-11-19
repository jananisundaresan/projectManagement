var AWS = require('aws-sdk'),
	uuid = require('uuid')


AWS.config.update({ region: "eu-west-2" });

exports.main = function(event, context, callback) {
  console.log(event);
  const data = event;
const params = {
    TableName: "customerRoles",
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'roleName': a roleName
    Item: {
      userId: data.userId,
      roleName: data.roleName,
      updatedAt: Date.now()
    }
  };
  try {
    call("put", params);
    callback(null, success(params.Item));
  } catch (e) {
      console.log(e);
    callback(null, failure({ status: false }));
  }
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
    body: {
      "userId": body.userId,
      "roleName": body.roleName,
      "updatedAt": body.updatedAt
    }
  };
}


function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

  return dynamoDb[action](params).promise();
}
