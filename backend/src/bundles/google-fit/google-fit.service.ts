import { type fitness_v1, google } from 'googleapis';

import {
    type OAuthEntity,
    type OAuthRepository,
} from '~/bundles/oauth/oauth.js';
import {
    OAuthActionsPath,
    OAuthProvider,
    oAuthService,
} from '~/bundles/oauth/oauth.js';
import {
    type WorkoutRepository,
    workoutService,
} from '~/bundles/workouts/workouts.js';
import { type Config } from '~/common/config/config.js';

import { Action, ApiPath, GoogleFitDataSourceId } from './enums/enums.js';
import { formatActivityName, prepareActions } from './helpers/helpers.js';
import { type WorkoutRequestDto } from './types/types.js';

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
            this.config.ENV.GOOGLE.CLIENT_ID,
            this.config.ENV.GOOGLE.CLIENT_SECRET,
            `${this.config.ENV.APP.API_BASE_URL}${ApiPath.OAUTH}/${OAuthProvider.GOOGLE_FIT}${OAuthActionsPath.EXCHANGE_TOKEN}`,
        );
        this.fitness = google.fitness({
            version: 'v1',
            auth: this.OAuth2,
        });
    }

    private async getFitnessData(
        dataSourceId: string,
        datasetId: string,
    ): Promise<number> {
        const response = await this.fitness.users.dataSources.datasets.get({
            userId: 'me',
            dataSourceId,
            datasetId,
        });

        const INITIAL_VALUE = 0;
        const DECIMAL_PLACES = 2;

        const result =
            response.data.point
                ?.map((p) => {
                    if (!p.value) {
                        return INITIAL_VALUE;
                    }
                    const [value] = p.value;
                    if (value && value.intVal) {
                        return value.intVal ?? INITIAL_VALUE;
                    }
                    return value?.fpVal ?? INITIAL_VALUE;
                })
                .reduce((a, b) => a + b, INITIAL_VALUE) ?? INITIAL_VALUE;

        return Number.parseFloat(result.toFixed(DECIMAL_PLACES));
    }

    private async formatGoogleFitResponse(
        sessions: fitness_v1.Schema$Session[],
    ): Promise<WorkoutRequestDto[]> {
        const result = await Promise.all(
            sessions.map(async (session): Promise<WorkoutRequestDto | null> => {
                const MILLIS_TO_NANOS = 1_000_000;
                const startTimeMillis = session.startTimeMillis as string;
                const endTimeMillis = session.endTimeMillis as string;
                const startTimeNanos = +startTimeMillis * MILLIS_TO_NANOS;
                const endTimeNanos = +endTimeMillis * MILLIS_TO_NANOS;
                const datasetId = `${startTimeNanos}-${endTimeNanos}`;
                const activityType = formatActivityName(
                    session.activityType ?? null,
                );

                if (!activityType) {
                    return null;
                }

                const [steps, calories, heartRate, distance, speed] =
                    await Promise.all([
                        this.getFitnessData(
                            GoogleFitDataSourceId.STEPS,
                            datasetId,
                        ),
                        this.getFitnessData(
                            GoogleFitDataSourceId.CALORIES,
                            datasetId,
                        ),
                        this.getFitnessData(
                            GoogleFitDataSourceId.HEART_RATE,
                            datasetId,
                        ),
                        this.getFitnessData(
                            GoogleFitDataSourceId.DISTANCE,
                            datasetId,
                        ),
                        this.getFitnessData(
                            GoogleFitDataSourceId.SPEED,
                            datasetId,
                        ),
                    ]);

                return {
                    activityId: session.id as string,
                    distance,
                    speed,
                    provider: OAuthProvider.GOOGLE_FIT,
                    heartRate,
                    activityType,
                    steps,
                    kilocalories: calories,
                    workoutStartedAt: new Date(+startTimeMillis),
                    workoutEndedAt: new Date(+endTimeMillis),
                };
            }),
        );

        return result.filter(Boolean) as WorkoutRequestDto[];
    }

    public async handleData(oAuthEntity: OAuthEntity): Promise<void> {
        const { userId, provider, refreshToken } = oAuthEntity.toObject();

        const token = await oAuthService.getAccessToken(provider, userId);

        this.OAuth2.setCredentials({
            access_token: token,
            refresh_token: refreshToken,
        });

        const startTime = new Date();
        startTime.setMonth(startTime.getMonth() - 1);

        const sessionsResponse = await this.fitness.users.sessions.list({
            userId: 'me',
            startTime: startTime.toISOString(),
        });

        const sessions = sessionsResponse.data.session ?? [];
        const formattedResponse = await this.formatGoogleFitResponse(sessions);
        const workoutEntities = await this.workoutRepository.findAll({
            userId,
            provider,
        });
        const workouts = workoutEntities.map((workout) =>
            workout.toNewObject(),
        );
        const preparedActions = prepareActions(workouts, formattedResponse);

        void Promise.all(
            preparedActions.map(({ action, data }) => {
                switch (action) {
                    case Action.CREATE: {
                        return workoutService.create({ ...data, userId });
                    }
                    case Action.UPDATE: {
                        return workoutService.update(
                            { activityId: data.activityId },
                            { ...data, userId },
                        );
                    }
                    case Action.DELETE: {
                        return workoutService.delete({
                            activityId: data.activityId,
                        });
                    }
                }
            }),
        );
    }
}

export { GoogleFitService };
