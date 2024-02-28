import { google } from 'googleapis';

import { type OAuthStateEntity,type OAuthStrategy  } from '~/bundles/oauth/oauth.js';
import { type Config } from '~/common/config/config.js';

class GoogleFitOAuthStrategy implements OAuthStrategy {
    private config: Config;

    private baseUrl: string;

    private apiPath: string;

    public constructor(config: Config) {
        this.config = config;
        this.baseUrl = `http://${config.ENV.APP.HOST}:${config.ENV.APP.PORT}`;
        this.apiPath = '/api/v1';
    }

    public getAuthorizeRedirectUrl(oAuthStateEntity: OAuthStateEntity): URL {
        const { userId } = oAuthStateEntity.toObject();
        const OAuth2 = new google.auth.OAuth2(
            this.config.ENV.GOOGLE_FIT.CLIENT_ID,
            this.config.ENV.GOOGLE_FIT.CLIENT_SECRET,
            'http://localhost:3001/api/v1/connections/'
        );
        const scopes = ['https://www.googleapis.com/auth/fitness.activity.read'];
        const url = OAuth2.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
            state: JSON.stringify({ userId })
        });
        console.log(url);
        console.log(userId);
        return url;
    }
}

export { GoogleFitOAuthStrategy };
