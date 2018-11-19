export const awsConfig = {
  's3': {
    'REGION': 'us-east-1',
    'BUCKET': 'bachu-serverlessstack'
  },
  'apiGateway': {
    'REGION': 'us-east-1',
    'URL': 'https://1ndav6mxce.execute-api.eu-west-2.amazonaws.com/prod'
  },
  'cognito': {
    'REGION': 'eu-west-2',
    'USER_POOL_ID': 'eu-west-2_t3Um8HkrK',
    'APP_CLIENT_ID': '3hqpuu5qo5fdu313umv0ji6iuo',
    'IDENTITY_POOL_ID': 'eu-west-2:d2a529ae-3444-4394-be7c-cacc0796844d'

  }
};

/*
interface Config {
  userPoolWebClientId: string;
  userPoolId: string;
  identityPoolId: string;
  userPoolArn: string;
  region: string;
}

const config: Config = {
  userPoolWebClientId: '7ito4q2hkpjrevp1rq3j30k82h',
  userPoolId: 'us-east-1_AZnjMpDFp',
  identityPoolId: 'us-east-1:a7c98bf4-1a43-4101-afed-5cfd99d15297',
  userPoolArn:
    'arn:aws:cognito-idp:us-east-1:737715219608:userpool/us-east-1_AZnjMpDFp',
  region: 'us-east-1'
};

export let {
  userPoolWebClientId,
  userPoolId,
  identityPoolId,
  userPoolArn,
  region
} = config;
*/
