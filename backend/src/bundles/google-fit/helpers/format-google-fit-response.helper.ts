import { type fitness_v1 } from 'googleapis';

import { GoogleFitRequiredActivity } from '../constants/constants.js';
import { type ValueOf,type WorkoutRequestDto, ActivityType } from '../types/types.js';

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

const getFitnessData = async (fitness: fitness_v1.Fitness, dataSourceId: string, datasetId: string): Promise<number> => {
    const response = await fitness.users.dataSources.datasets.get({
        userId: 'me',
        dataSourceId,
        datasetId
    });

    const INITIAL_VALUE = 0;

    return response.data.point?.map(p => {
        if (!p.value) {
            return INITIAL_VALUE;
        }
        const [value] = p.value;
        if (value?.intVal) {
            return value?.intVal ?? INITIAL_VALUE;
        }
        return value?.fpVal ?? INITIAL_VALUE;
    })
        .reduce((a, b) => a + b, INITIAL_VALUE) ?? INITIAL_VALUE;
};

const formatGoogleFitResponse = async (sessions: fitness_v1.Schema$Session[], fitness: fitness_v1.Fitness): Promise<WorkoutRequestDto[]> => {
    return await Promise.all(sessions.map(async (session): Promise<WorkoutRequestDto> => {
        const MILLIS_TO_NANOS = 1_000_000;
        const startTimeMillis  = session.startTimeMillis as string;
        const endTimeMillis = session.endTimeMillis as string;
        const startTimeNanos = (+startTimeMillis * MILLIS_TO_NANOS);
        const endTimeNanos = (+endTimeMillis * MILLIS_TO_NANOS);
        const datasetId = `${startTimeNanos}-${endTimeNanos}`;
        const activityType = formatActivityName(session.activityType ?? null);

        if (!activityType) {
            return null;
        }

        const [steps, calories, heartRate, distance, speed] = await Promise.all([
            getFitnessData(fitness, 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps', datasetId),
            getFitnessData(fitness, 'derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended', datasetId),
            getFitnessData(fitness, 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm', datasetId),
            getFitnessData(fitness, 'derived:com.google.distance.delta:com.google.android.gms:merge_distance_delta', datasetId),
            getFitnessData(fitness, 'derived:com.google.speed:com.google.android.gms:merge_speed', datasetId)
        ]);

        return {
            activityId: session.id as string,
            distance,
            speed,
            heartRate,
            activityType,
            steps,
            kilocalories: calories,
            workoutStartedAt: new Date(startTimeMillis),
            workoutEndedAt: new Date(endTimeMillis)
        };
    }));
};

export { formatGoogleFitResponse };
