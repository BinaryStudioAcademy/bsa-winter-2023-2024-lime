const GoogleFitDataSourceId = {
    STEPS: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps',
    CALORIES:
        'derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended',
    HEART_RATE:
        'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm',
    DISTANCE:
        'derived:com.google.distance.delta:com.google.android.gms:merge_distance_delta',
    SPEED: 'derived:com.google.speed:com.google.android.gms:merge_speed',
} as const;

export { GoogleFitDataSourceId };
