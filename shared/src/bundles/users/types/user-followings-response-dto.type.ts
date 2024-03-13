import { type ValueOf } from '../../../types/types.js';
import { type Gender } from '../users.js';

type UserFollowingsResponseDto = {
    id: number;
    userId: number;
    email: string | null;
    avatarUrl: string | null;
    username: string | null;
    fullName: string | null;
    dateOfBirth: string | null;
    weight: number | null;
    height: number | null;
    gender: ValueOf<typeof Gender> | null;
};

export { type UserFollowingsResponseDto };
