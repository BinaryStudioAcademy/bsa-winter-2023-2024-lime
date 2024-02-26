import { type Entity } from '~/common/types/types.js';

import { type Gender } from './enums/enums.js';
import { type ValueOf } from './types/types.js';

class UserEntity implements Entity {
    private 'id': number | null;

    private 'email': string;

    private 'passwordHash': string;

    private 'fullName': string | null;

    private 'avatarUrl': string | null;

    private 'username': string | null;

    private 'dateOfBirth': string | null;

    private 'weight': number | null;

    private 'height': number | null;

    private 'gender': ValueOf<typeof Gender> | null;

    private constructor({
        id,
        email,
        passwordHash,
        fullName,
        avatarUrl,
        username,
        dateOfBirth,
        weight,
        height,
        gender,
    }: {
        id: number | null;
        email: string;
        passwordHash: string;
        fullName: string | null;
        avatarUrl: string | null;
        username: string | null;
        dateOfBirth: string | null;
        weight: number | null;
        height: number | null;
        gender: ValueOf<typeof Gender> | null;
    }) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        this.fullName = fullName;
        this.avatarUrl = avatarUrl;
        this.username = username;
        this.dateOfBirth = dateOfBirth;
        this.weight = weight;
        this.height = height;
        this.gender = gender;
    }

    public getPasswordHash(): string {
        return this.passwordHash;
    }

    public static initialize({
        id,
        email,
        passwordHash,
        fullName,
        avatarUrl,
        username,
        dateOfBirth,
        weight,
        height,
        gender,
    }: {
        id: number;
        email: string;
        passwordHash: string;
        fullName: string | null;
        avatarUrl: string | null;
        username: string | null;
        dateOfBirth: string | null;
        weight: number | null;
        height: number | null;
        gender: ValueOf<typeof Gender> | null;
    }): UserEntity {
        return new UserEntity({
            id,
            email,
            passwordHash,
            fullName,
            avatarUrl,
            username,
            dateOfBirth,
            weight,
            height,
            gender,
        });
    }

    public static initializeNew({
        email,
        passwordHash,
    }: {
        email: string;
        passwordHash: string;
    }): UserEntity {
        return new UserEntity({
            id: null,
            email,
            passwordHash,
            fullName: null,
            avatarUrl: null,
            username: null,
            dateOfBirth: null,
            weight: null,
            height: null,
            gender: null,
        });
    }

    public toObject(): {
        id: number;
        email: string;
        fullName: string | null;
        avatarUrl: string | null;
        username: string | null;
        dateOfBirth: string | null;
        weight: number | null;
        height: number | null;
        gender: ValueOf<typeof Gender> | null;
    } {
        return {
            id: this.id as number,
            email: this.email,
            fullName: this.fullName,
            avatarUrl: this.avatarUrl,
            username: this.username,
            dateOfBirth: this.dateOfBirth,
            weight: this.weight as number,
            height: this.height as number,
            gender: this.gender,
        };
    }

    public toNewObject(): {
        email: string;
        passwordHash: string;
    } {
        return {
            email: this.email,
            passwordHash: this.passwordHash,
        };
    }
}

export { UserEntity };
