'use strict';

var AWS = require('aws-sdk');

var cognito = new AWS.CognitoIdentityServiceProvider();

exports.handler = function (event, context, callback) {
    cognito.listUsers({
        UserPoolId: 'eu-west-2_t3Um8HkrK',
        AttributesToGet: [ "name", "family_name", "email", "custom:userId", "custom:roleName"],
        Filter: '',
        Limit: 60
    }, function (err, data) {
        if (err === null) {
            var logins = [];
            data.Users.forEach(function (user) {
                logins.push(user);
            });
            callback(null, logins);
        } else {
            callback(err);
        }
    });
};
