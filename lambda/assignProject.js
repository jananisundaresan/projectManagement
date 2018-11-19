var AWS = require('aws-sdk'),
	uuid = require('uuid')


AWS.config.update({ region: "eu-west-2" });

exports.main = function(event, context, callback) {
  console.log(event);
  const data = event;
const params = {
    TableName: "projectManagement",
    Item: {
      userId: data.userId,
      projectName: data.projectName,
      projectId: data.projectId,
      projectStatus: data.projectStatus,
      projectDescription: data.projectDescription,
      projectManager: data.projectManager,
      projectStartDate: data.projectStartDate,
      projectEndDate: data.projectEndDate,
      projectDevelopers: data.projectDevelopers,
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
      "projectName": body.projectName,
      "projectId": body.projectId,
      "projectStatus": body.projectStatus,
      "projectDescription": body.projectDescription,
      "projectManager": body.projectManager,
      "projectStartDate": body.projectStartDate,
      "projectEndDate": body.projectEndDate,
      "projectDevelopers": body.projectDevelopers,
    }
  };
}


function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

  return dynamoDb[action](params).promise();
}
