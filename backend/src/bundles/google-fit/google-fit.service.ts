import { type fitness_v1, google } from 'googleapis';

import {
    type OAuthRepository,
    ErrorMessage,
    HttpCode,
    HttpError,
    OAuthActionsPath,
    OAuthProvider,
} from '~/bundles/oauth/oauth.js';
import {
    type WorkoutRepository,
    workoutService,
} from '~/bundles/workouts/workouts.js';
import { type Config } from '~/common/config/config.js';

import { MILLISECONDS_PER_SECOND } from './constants/constants.js';
import { Action, ApiPath } from './enums/enums.js';
import { formatGoogleFitResponse, prepareActions } from './helpers/helpers.js';

class GoogleFitService {
    private config: Config;
    private fitness: fitness_v1.Fitness;
    private oAuthRepository: OAuthRepository;
    private workoutRepository: WorkoutRepository;

    private OAuth2;
    public constructor(
        config: Config,
        oAuthRepository: OAuthRepository,
        workoutRepository: WorkoutRepository,
    ) {
        this.config = config;
        this.oAuthRepository = oAuthRepository;
        this.workoutRepository = workoutRepository;
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

    public async handleData(id: number): Promise<void> {
        const oAuthEntity = await this.oAuthRepository.find({ userId: id });

        if (!oAuthEntity) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: ErrorMessage.NO_CONNECTION,
            });
        }
        const { accessToken, refreshToken, userId } = oAuthEntity.toObject();

        this.OAuth2.setCredentials({
            access_token: accessToken,
            refresh_token: refreshToken,
        });

        const SECONDS_IN_MINUTE = 60;
        const MINUTES_IN_HOUR = 60;
        const HOURS_IN_DAY = 24;
        const DAYS_BACK = 30;

        const startTime = new Date(
            Date.now() -
                DAYS_BACK *
                    HOURS_IN_DAY *
                    MINUTES_IN_HOUR *
                    SECONDS_IN_MINUTE *
                    MILLISECONDS_PER_SECOND,
        ).toISOString();

        const sessionsResponse = await this.fitness.users.sessions.list({
            userId: 'me',
            startTime,
        });

        const sessions = sessionsResponse.data.session ?? [];
        const formattedResponse = await formatGoogleFitResponse(
            sessions,
            this.fitness,
        );
        const workoutEntities = await this.workoutRepository.findAll({
            userId,
        });
        const workouts = workoutEntities.map((workout) =>
            workout.toNewObject(),
        );
        const preparedActions = prepareActions(workouts, formattedResponse);

        for (const { action, data } of preparedActions) {
            switch (action) {
                case Action.CREATE: {
                    await workoutService.create({ ...data, userId });
                    break;
                }
                case Action.UPDATE: {
                    await workoutService.update(
                        { activityId: data.activityId },
                        { ...data, userId },
                    );
                    break;
                }
                case Action.DELETE: {
                    await workoutService.delete({
                        activityId: data.activityId,
                    });
                    break;
                }
            }
        }
    }
}

export { GoogleFitService };
