import { type fitness_v1, google } from 'googleapis';

import { OAuthActionsPath, OAuthProvider } from '~/bundles/oauth/oauth.js';
import { type Config } from '~/common/config/config.js';

import { ApiPath } from './enums/enums.js';

class GoogleFitService {
    private config: Config;
    private fitness: fitness_v1.Fitness;
    private OAuth2;
    public constructor(config: Config) {
        this.config = config;
        this.OAuth2 = new google.auth.OAuth2(
            this.config.ENV.GOOGLE_FIT.CLIENT_ID,
            this.config.ENV.GOOGLE_FIT.CLIENT_SECRET,
            `${this.config.ENV.APP.API_BASE_URL}${ApiPath.OAUTH}/${OAuthProvider.GOOGLE_FIT}${OAuthActionsPath.EXCHANGE_TOKEN}`,
        );
        this.fitness = google.fitness({
            version: 'v1',
            auth: this.OAuth2
        });
    }

}

export { GoogleFitService };
