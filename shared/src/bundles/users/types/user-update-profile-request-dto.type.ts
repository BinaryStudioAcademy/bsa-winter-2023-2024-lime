import { type ValueOf } from '../../../types/types.js';
import { type Gender } from '../users.js';

type UserUpdateProfileRequestDto = {
    id: number | null;
    fullName?: string | null;
    username?: string | null;
    avatarUrl?: string | null;
    dateOfBirth?: string | null;
    weight?: string | null;
    height?: string | null;
    gender?: ValueOf<typeof Gender>;
    [key: string]: string | number | null;
};

export { type UserUpdateProfileRequestDto };
