import { type fitness_v1, google } from 'googleapis';

import { type OAuthRepository, ErrorMessage, HttpCode,HttpError } from '~/bundles/oauth/oauth.js';
import { OAuthActionsPath, OAuthProvider } from '~/bundles/oauth/oauth.js';
import { type Config } from '~/common/config/config.js';

import { ApiPath } from './enums/enums.js';
import { formatGoogleFitResponse } from './helpers/helpers.js';

class GoogleFitService {
    private config: Config;
    private fitness: fitness_v1.Fitness;
    private oAuthRepository: OAuthRepository;

    private OAuth2;
    public constructor(config: Config,oAuthRepository: OAuthRepository,) {
        this.config = config;
        this.oAuthRepository = oAuthRepository;
        this.OAuth2 = new google.auth.OAuth2(
            this.config.ENV.GOOGLE_FIT.CLIENT_ID,
            this.config.ENV.GOOGLE_FIT.CLIENT_SECRET,
            `${this.config.ENV.APP.API_BASE_URL}${ApiPath.OAUTH}/${OAuthProvider.GOOGLE_FIT}${OAuthActionsPath.EXCHANGE_TOKEN}`,
        );
        this.fitness = google.fitness({
            version: 'v1',
            auth: this.OAuth2,
        });
    }

    public async handleData(id: number): Promise<fitness_v1.Schema$AggregateResponse> {

        const oAuthEntity = await this.oAuthRepository.find({ userId: id });

        if (!oAuthEntity) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: ErrorMessage.NO_CONNECTION,
            });
        }
        const { accessToken, refreshToken } = oAuthEntity.toObject();

        this.OAuth2.setCredentials({
            access_token: accessToken,
            refresh_token: refreshToken
        });

        const adjustedStartTime = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();
        // const adjustedEndTime = new Date(Date.now() - timezoneOffsetMillis).toISOString();

        const sessionsResponse = await this.fitness.users.sessions.list({
            userId: 'me',
            startTime: adjustedStartTime
        });

        const sessions = sessionsResponse.data.session ?? [];

        await formatGoogleFitResponse(sessions, this.fitness);

        // return await Promise.all(sessionsResponse.data.session.map(async (session) => {
        //
        //     const startTimeMillis = session.startTimeMillis * 1_000_000;
        //     const endTimeMillis = session.endTimeMillis * 1_000_000;
        //
        //     const stepsResponse = await this.fitness.users.dataSources.datasets.get({
        //         userId: 'me',
        //         dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps',
        //         datasetId: `${startTimeMillis}-${endTimeMillis}`
        //     });
        //
        //     const caloriesResponse = await this.fitness.users.dataSources.datasets.get({
        //         userId: 'me',
        //         dataSourceId: 'derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended',
        //         datasetId: `${startTimeMillis}-${endTimeMillis}`
        //     });
        //
        //     const heartRateResponse = await this.fitness.users.dataSources.datasets.get({
        //         userId: 'me',
        //         dataSourceId: 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm',
        //         datasetId: `${startTimeMillis}-${endTimeMillis}`
        //     });
        //
        //     const distanceResponse = await this.fitness.users.dataSources.datasets.get({
        //         userId: 'me',
        //         dataSourceId: 'derived:com.google.distance.delta:com.google.android.gms:merge_distance_delta',
        //         datasetId: `${startTimeMillis}-${endTimeMillis}`
        //     });
        //
        //     const speedResponse = await this.fitness.users.dataSources.datasets.get({
        //         userId: 'me',
        //         dataSourceId: 'derived:com.google.speed:com.google.android.gms:merge_speed',
        //         datasetId: `${startTimeMillis}-${endTimeMillis}`
        //     });
        //
        //     const distance = distanceResponse.data.point.reduce((total, point) => {
        //         return total + (point.value[0].fpVal || 0);
        //     }, 0);
        //
        //     const speed = speedResponse.data.point.reduce((total, point) => {
        //         return total + (point.value[0].fpVal || 0);
        //     }, 0);
        //
        //     const stepsDataPoints = stepsResponse.data.point.map(p => p.value[0].intVal).reduce((a, b) => a + b, 0);
        //     const caloriesDataPoints = caloriesResponse.data.point.map(p => p.value[0].fpVal).reduce((a, b) => a + b, 0);
        //
        //     return {
        //         sessionId: session.id,
        //         name: session.name,
        //         activityType: session.activityType,
        //         startTimeMillis,
        //         endTimeMillis,
        //         distance,
        //         speed,
        //         steps: stepsDataPoints,
        //         calories: caloriesDataPoints,
        //     };
        // }));
    }
}

export { GoogleFitService };
