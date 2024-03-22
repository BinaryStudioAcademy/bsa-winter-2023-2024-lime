import { type ValueOf } from '../../../types/types.js';
import { type Gender } from '../users.js';

type UserUpdateProfileRequestDto = {
    avatarUrl: string | null;
    fullName: string | null;
    username: string | null;
    dateOfBirth: string | null;
    weight: number | null | '';
    height: number | null | '';
    location: string | null;
    gender: ValueOf<typeof Gender>;
    isPublic: boolean;
};

export { type UserUpdateProfileRequestDto };
