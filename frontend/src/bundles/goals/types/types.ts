type GoalRequestDto = {
    activity: string;
    frequency: number;
    distance: number;
    duration: number;
};

type GoalResponseDto = {
    id: number;
    activity: string;
    frequency: number;
    distance: number;
    duration: number;
    progress: number;
};

export { type GoalRequestDto, type GoalResponseDto };
