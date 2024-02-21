import { type ValueOf } from '../../../types/types.js';
import { type Gender } from '../users.js';

type UserUpdateProfileRequestDto = {
    id: number | null;
    fullName: string;
    username: string;
    avatarUrl: string;
    dateOfBirth: string;
    weight: string;
    height: string;
    gender: ValueOf<typeof Gender>;
};

export { type UserUpdateProfileRequestDto };
