import { type ValueOf } from '../../../types/types.js';
import { type Gender } from '../users.js';

type UserUpdateProfileRequestDto = {
    id: number | null;
    fullname: string;
    nickname: string;
    dateOfBirth: string;
    weight: string;
    height: string;
    gender: ValueOf<typeof Gender>;
};

export { type UserUpdateProfileRequestDto };
