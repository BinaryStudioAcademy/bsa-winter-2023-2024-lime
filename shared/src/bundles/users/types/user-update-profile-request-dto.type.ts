import { type ValueOf } from '../../../types/types.js';
import { type Gender } from '../users.js';

type UserUpdateProfileRequestDto = {
    fullName: string | null;
    username: string | null;
    dateOfBirth: string | null;
    weight: number | null | '';
    height: number | null | '';
    gender: ValueOf<typeof Gender>;
    [key: string]: string | number | null;
};

export { type UserUpdateProfileRequestDto };
