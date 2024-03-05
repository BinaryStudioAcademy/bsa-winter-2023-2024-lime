import { type ValueOf } from '../../../types/types.js';
import { type Gender } from '../users.js';

type UserAuthResponseDto = {
    id: number;
    email: string;
    stripeCustomerId: string;
    avatarUrl: string | null;
    username: string | null;
    fullName: string | null;
    dateOfBirth: string | null;
    weight: number | null;
    height: number | null;
    gender: ValueOf<typeof Gender> | null;
    referralCode: string | null;
    bonusBalance: number | null;
};

export { type UserAuthResponseDto };
