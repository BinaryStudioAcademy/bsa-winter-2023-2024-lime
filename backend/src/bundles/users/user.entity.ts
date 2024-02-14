import { type Entity } from '~/common/types/types.js';

class UserEntity implements Entity {
    private 'id': number | null;

    private 'email': string;

    private 'passwordHash': string;

    private 'passwordSalt': string;

    private 'fullName'?: string | undefined;

    private constructor({
        id,
        email,
        passwordHash,
        passwordSalt,
        fullName,
    }: {
        id: number | null;
        email: string;
        passwordHash: string;
        passwordSalt: string;
        fullName?: string | undefined;
    }) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        this.passwordSalt = passwordSalt;
        this.fullName = fullName;
    }

    public static initialize({
        id,
        email,
        passwordHash,
        passwordSalt,
        fullName,
    }: {
        id: number;
        email: string;
        passwordHash: string;
        passwordSalt: string;
        fullName?: string | undefined;
    }): UserEntity {
        return new UserEntity({
            id,
            email,
            passwordHash,
            passwordSalt,
            fullName,
        });
    }

    public static initializeNew({
        email,
        passwordHash,
        passwordSalt,
        fullName,
    }: {
        email: string;
        passwordHash: string;
        passwordSalt: string;
        fullName?: string | undefined;
    }): UserEntity {
        return new UserEntity({
            id: null,
            email,
            passwordHash,
            passwordSalt,
            fullName,
        });
    }

    public toObject(): {
        id: number;
        email: string;
        fullName?: string | undefined;
    } {
        return {
            id: this.id as number,
            email: this.email,
            fullName: this.fullName,
        };
    }

    public toNewObject(): {
        email: string;
        passwordHash: string;
        passwordSalt: string;
        fullName?: string | undefined;
    } {
        return {
            email: this.email,
            passwordHash: this.passwordHash,
            passwordSalt: this.passwordSalt,
            fullName: this.fullName,
        };
    }
}

export { UserEntity };
