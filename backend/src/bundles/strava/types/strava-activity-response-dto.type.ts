type StravaActivityResponseDto = {
    distance: number;
    elapsed_time: number;
    type: string;
    heartrate: number | undefined;
    start_date: Date;
    average_speed: number;
    calories: number;
};

export { type StravaActivityResponseDto };
