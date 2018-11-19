import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import Amplify from 'aws-amplify';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {awsConfig} from './awsconfig';

if (environment.production) {
  enableProdMode();
}

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: awsConfig.cognito.REGION,
    userPoolId: awsConfig.cognito.USER_POOL_ID,
    identityPoolId: awsConfig.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: awsConfig.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: awsConfig.s3.REGION,
    bucket: awsConfig.s3.BUCKET,
    identityPoolId: awsConfig.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: 'ProjectManagement',
        endpoint: awsConfig.apiGateway.URL,
        region: awsConfig.apiGateway.REGION
      },
    ]
  }
});

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
