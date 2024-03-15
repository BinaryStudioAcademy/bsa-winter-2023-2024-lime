import { type Entity } from '~/common/types/types.js';

import { type Gender } from './enums/enums.js';
import { type ValueOf } from './types/types.js';

class UserEntity implements Entity {
    private 'id': number | null;

    private 'email': string;

    private 'passwordHash': string | null;

    private 'stripeCustomerId': string;

    private 'fullName': string | null;

    private 'avatarUrl': string | null;

    private 'username': string | null;

    private 'dateOfBirth': string | null;

    private 'weight': number | null;

    private 'height': number | null;

    private 'location': string | null;

    private 'isPublic': boolean;

    private 'gender': ValueOf<typeof Gender> | null;

    private 'referralCode': string | null;

    private 'bonusBalance': number | null;

    private constructor({
        id,
        email,
        passwordHash,
        stripeCustomerId,
        fullName,
        avatarUrl,
        username,
        dateOfBirth,
        weight,
        height,
        location,
        gender,
        isPublic,
        referralCode,
        bonusBalance,
    }: {
        id: number | null;
        email: string;
        passwordHash: string | null;
        stripeCustomerId: string;
        fullName: string | null;
        avatarUrl: string | null;
        username: string | null;
        dateOfBirth: string | null;
        weight: number | null;
        height: number | null;
        location: string | null;
        gender: ValueOf<typeof Gender> | null;
        isPublic: boolean;
        referralCode: string | null;
        bonusBalance: number | null;
    }) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        this.stripeCustomerId = stripeCustomerId;
        this.fullName = fullName;
        this.avatarUrl = avatarUrl;
        this.username = username;
        this.dateOfBirth = dateOfBirth;
        this.weight = weight;
        this.height = height;
        this.location = location;
        this.gender = gender;
        this.isPublic = isPublic;
        this.referralCode = referralCode;
        this.bonusBalance = bonusBalance;
    }

    public getPasswordHash(): string | null {
        return this.passwordHash;
    }

    public static initialize({
        id,
        email,
        passwordHash,
        stripeCustomerId,
        fullName,
        avatarUrl,
        username,
        dateOfBirth,
        weight,
        height,
        location,
        gender,
        isPublic,
        referralCode,
        bonusBalance,
    }: {
        id: number;
        email: string;
        passwordHash: string | null;
        stripeCustomerId: string;
        fullName: string | null;
        avatarUrl: string | null;
        username: string | null;
        dateOfBirth: string | null;
        weight: number | null;
        height: number | null;
        location: string | null;
        gender: ValueOf<typeof Gender> | null;
        isPublic: boolean;
        referralCode: string | null;
        bonusBalance: number | null;
    }): UserEntity {
        return new UserEntity({
            id,
            email,
            passwordHash,
            stripeCustomerId,
            fullName,
            avatarUrl,
            username,
            dateOfBirth,
            weight,
            height,
            location,
            gender,
            isPublic,
            referralCode,
            bonusBalance,
        });
    }

    public static initializeNew({
        email,
        passwordHash,
        stripeCustomerId,
        referralCode,
        fullName,
        avatarUrl,
    }: {
        email: string;
        stripeCustomerId: string;
        referralCode: string | null;
        passwordHash?: string;
        fullName?: string;
        avatarUrl?: string;
    }): UserEntity {
        return new UserEntity({
            id: null,
            email,
            passwordHash: passwordHash ?? null,
            stripeCustomerId,
            fullName: fullName ?? null,
            avatarUrl: avatarUrl ?? null,
            username: null,
            dateOfBirth: null,
            weight: null,
            height: null,
            location: null,
            gender: null,
            isPublic: false,
            referralCode,
            bonusBalance: null,
        });
    }

    public toObject(): {
        id: number;
        email: string;
        stripeCustomerId: string;
        fullName: string | null;
        avatarUrl: string | null;
        username: string | null;
        dateOfBirth: string | null;
        weight: number | null;
        height: number | null;
        location: string | null;
        gender: ValueOf<typeof Gender> | null;
        isPublic: boolean;
        referralCode: string | null;
        bonusBalance: number | null;
    } {
        return {
            id: this.id as number,
            email: this.email,
            stripeCustomerId: this.stripeCustomerId,
            fullName: this.fullName,
            avatarUrl: this.avatarUrl,
            username: this.username,
            dateOfBirth: this.dateOfBirth,
            weight: this.weight as number,
            height: this.height as number,
            location: this.location,
            gender: this.gender,
            isPublic: this.isPublic,
            referralCode: this.referralCode,
            bonusBalance: this.bonusBalance as number,
        };
    }

    public toNewObject(): {
        email: string;
        passwordHash: string | null;
        stripeCustomerId: string;
        referralCode: string | null;
        fullName: string | null;
        avatarUrl: string | null;
    } {
        return {
            email: this.email,
            passwordHash: this.passwordHash,
            stripeCustomerId: this.stripeCustomerId,
            referralCode: this.referralCode,
            fullName: this.fullName,
            avatarUrl: this.avatarUrl,
        };
    }
}

export { UserEntity };
