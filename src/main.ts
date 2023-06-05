import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { Amplify } from 'aws-amplify';

const redirectURL = `http${window.location.hostname != 'localhost' ? 's' : ''}://${window.location.hostname}${window.location.hostname == 'localhost' ? ':' + window.location.port : ""}/auth/login`;
const awsConfig = {
	"aws_project_region": "us-east-1",
	"aws_cognito_region": "us-east-1",
	"aws_user_pools_id": "us-east-1_m2q58Yol0",
	"aws_user_pools_web_client_id": "1qm0fn5iuqmv2hn2hs8jt4sqau",
	"oauth": {
		"domain": "sso.mgoconnect.org",
		"scope": [
			"phone",
			"email",
			"openid",
			"profile",
			"aws.cognito.signin.user.admin"
		],
		"redirectSignIn": redirectURL,
		"redirectSignOut": redirectURL,
		"responseType": "code"
	}
};
Amplify.configure(awsConfig);

platformBrowserDynamic().bootstrapModule(AppModule)
	.catch(err => console.error(err));
