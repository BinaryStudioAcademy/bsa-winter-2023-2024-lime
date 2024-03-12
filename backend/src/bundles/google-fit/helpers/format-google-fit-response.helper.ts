import { type fitness_v1 } from 'googleapis';

import {
    GoogleFitDataSourceId,
    GoogleFitRequiredActivity,
 OAuthProvider } from '../enums/enums.js';
import {
    type ValueOf,
    type WorkoutRequestDto,
    ActivityType,
} from '../types/types.js';

const formatActivityName = (
    activityType: number | null,
): ValueOf<typeof ActivityType> | null => {
    let result;
    switch (activityType) {
        case GoogleFitRequiredActivity.WALKING: {
            result = ActivityType.WALKING;
            break;
        }
        case GoogleFitRequiredActivity.RUNNING: {
            result = ActivityType.RUNNING;
            break;
        }
        case GoogleFitRequiredActivity.CYCLING: {
            result = ActivityType.CYCLING;
            break;
        }
    }
    return result ?? null;
};

const getFitnessData = async (
    fitness: fitness_v1.Fitness,
    dataSourceId: string,
    datasetId: string,
): Promise<number> => {
    const response = await fitness.users.dataSources.datasets.get({
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
};

const formatGoogleFitResponse = async (
    sessions: fitness_v1.Schema$Session[],
    fitness: fitness_v1.Fitness,
): Promise<WorkoutRequestDto[]> => {
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
                    getFitnessData(
                        fitness,
                        GoogleFitDataSourceId.STEPS,
                        datasetId,
                    ),
                    getFitnessData(
                        fitness,
                        GoogleFitDataSourceId.CALORIES,
                        datasetId,
                    ),
                    getFitnessData(
                        fitness,
                        GoogleFitDataSourceId.HEART_RATE,
                        datasetId,
                    ),
                    getFitnessData(
                        fitness,
                        GoogleFitDataSourceId.DISTANCE,
                        datasetId,
                    ),
                    getFitnessData(
                        fitness,
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
};

export { formatGoogleFitResponse };
