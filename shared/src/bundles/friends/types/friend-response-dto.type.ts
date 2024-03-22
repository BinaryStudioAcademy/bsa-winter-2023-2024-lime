import { type ValueOf } from '../../../types/types.js';
import { type Gender } from '../../users/enums/user-gender.enum.js';

type FriendResponseDto = {
    id: number;
    userId: number;
    email: string;
    avatarUrl: string | null;
    username: string | null;
    fullName: string | null;
    dateOfBirth: string | null;
    weight: number | null;
    height: number | null;
    location: string | null;
    gender: ValueOf<typeof Gender> | null;
    isFollowing?: boolean;
};

export { type FriendResponseDto };
