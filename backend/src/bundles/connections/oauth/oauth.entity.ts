import { type Entity } from '~/common/types/types.js';

import { type Providers } from './enums/enums.js';
import { type ValueOf } from './types/types.js';

class OAuthEntity implements Entity {
    private 'id': number | null;

    private 'userId': number;

    private 'tokenType': string;

    private 'expiresIn': number;

    private 'expiresAt': number;

    private 'accessToken': string;

    private 'refreshToken': string;

    private 'scope': string;

    private 'provider': ValueOf<typeof Providers>;

    private constructor({
        id,
        userId,
        tokenType,
        expiresIn,
        expiresAt,
        accessToken,
        refreshToken,
        scope,
        provider,
    }: {
        id: number | null;
        userId: number;
        tokenType: string;
        expiresIn: number;
        expiresAt: number;
        accessToken: string;
        refreshToken: string;
        scope: string;
        provider: ValueOf<typeof Providers>;
    }) {
        this.id = id;
        this.userId = userId;
        this.tokenType = tokenType;
        this.expiresIn = expiresIn;
        this.expiresAt = expiresAt;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.scope = scope;
        this.provider = provider;
    }

    public static initialize({
        id,
        userId,
        tokenType,
        expiresIn,
        expiresAt,
        accessToken,
        refreshToken,
        scope,
        provider,
    }: {
        id: number;
        userId: number;
        tokenType: string;
        expiresIn: number;
        expiresAt: number;
        accessToken: string;
        refreshToken: string;
        scope: string;
        provider: ValueOf<typeof Providers>;
    }): OAuthEntity {
        return new OAuthEntity({
            id,
            userId,
            tokenType,
            expiresIn,
            expiresAt,
            accessToken,
            refreshToken,
            scope,
            provider,
        });
    }

    public static initializeNew({
        userId,
        tokenType,
        expiresIn,
        expiresAt,
        accessToken,
        refreshToken,
        scope,
        provider,
    }: {
        userId: number;
        tokenType: string;
        expiresIn: number;
        expiresAt: number;
        accessToken: string;
        refreshToken: string;
        scope: string;
        provider: ValueOf<typeof Providers>;
    }): OAuthEntity {
        return new OAuthEntity({
            id: null,
            userId,
            tokenType,
            expiresIn,
            expiresAt,
            accessToken,
            refreshToken,
            scope,
            provider,
        });
    }

    public toObject(): {
        id: number;
        userId: number;
        tokenType: string;
        expiresIn: number;
        expiresAt: number;
        accessToken: string;
        refreshToken: string;
        scope: string;
        provider: ValueOf<typeof Providers>;
    } {
        return {
            id: this.id as number,
            userId: this.userId,
            tokenType: this.tokenType,
            expiresIn: this.expiresIn,
            expiresAt: this.expiresAt,
            accessToken: this.accessToken,
            refreshToken: this.refreshToken,
            scope: this.scope,
            provider: this.provider,
        };
    }

    public toNewObject(): {
        userId: number;
        tokenType: string;
        expiresIn: number;
        expiresAt: number;
        accessToken: string;
        refreshToken: string;
        scope: string;
        provider: ValueOf<typeof Providers>;
    } {
        return {
            userId: this.userId,
            tokenType: this.tokenType,
            expiresIn: this.expiresIn,
            expiresAt: this.expiresAt,
            accessToken: this.accessToken,
            refreshToken: this.refreshToken,
            scope: this.scope,
            provider: this.provider,
        };
    }
}

export { OAuthEntity };
