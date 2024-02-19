import { type Entity } from '~/common/types/types.js';

class UserEntity implements Entity {
    private 'id': number | null;

    private 'email': string;

    private 'passwordHash': string;

    private 'fullName': string | null;

    private 'subscriptionId': string | null;

    private constructor({
        id,
        email,
        passwordHash,
        fullName,
    }: {
        id: number | null;
        email: string;
        passwordHash: string;
        fullName: string | null;
    }) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        this.fullName = fullName;
    }

    public static initialize({
        id,
        email,
        passwordHash,
        fullName,
    }: {
        id: number;
        email: string;
        passwordHash: string;
        fullName: string | null;
    }): UserEntity {
        return new UserEntity({
            id,
            email,
            passwordHash,
            fullName,
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
        });
    }

    public toObject(): {
        id: number;
        email: string;
        fullName: string | null;
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
    } {
        return {
            email: this.email,
            passwordHash: this.passwordHash,
        };
    }
}

export { UserEntity };
