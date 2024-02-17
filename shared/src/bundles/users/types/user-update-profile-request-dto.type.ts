import { type ValueOf } from '../../../types/types.js';
import { type Gender } from '../users.js';

type UserUpdateProfileRequestDto = {
    fullname: string;
    nickname: string;
    birthdate: string;
    weight: string;
    height: string;
    gender: ValueOf<typeof Gender>;
};

export { type UserUpdateProfileRequestDto };
