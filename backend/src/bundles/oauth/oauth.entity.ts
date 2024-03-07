import { type Entity } from '~/common/types/types.js';

import { type OAuthProvider } from './enums/enums.js';
import { type ValueOf } from './types/types.js';

class OAuthEntity implements Entity {
    private 'id': number | null;

    private 'userId': number;

    private 'ownerId': number | undefined;

    private 'tokenType': string;

    private 'expiresAt': number;

    private 'accessToken': string;

    private 'refreshToken': string;

    private 'scope': string;

    private 'provider': ValueOf<typeof OAuthProvider>;

    private constructor({
        id,
        userId,
        ownerId,
        tokenType,
        expiresAt,
        accessToken,
        refreshToken,
        scope,
        provider,
    }: {
        id: number | null;
        userId: number;
        ownerId?: number;
        tokenType: string;
        expiresAt: number;
        accessToken: string;
        refreshToken: string;
        scope: string;
        provider: ValueOf<typeof OAuthProvider>;
    }) {
        this.id = id;
        this.ownerId = ownerId;
        this.userId = userId;
        this.tokenType = tokenType;
        this.expiresAt = expiresAt;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.scope = scope;
        this.provider = provider;
    }

    public static initialize(payload: {
        id: number;
        userId: number;
        ownerId?: number;
        tokenType: string;
        expiresAt: number;
        accessToken: string;
        refreshToken: string;
        scope: string;
        provider: ValueOf<typeof OAuthProvider>;
    }): OAuthEntity {
        return new OAuthEntity({
            ...payload,
        });
    }

    public static initializeNew(payload: {
        userId: number;
        ownerId?: number;
        tokenType: string;
        expiresAt: number;
        accessToken: string;
        refreshToken: string;
        scope: string;
        provider: ValueOf<typeof OAuthProvider>;
    }): OAuthEntity {
        return new OAuthEntity({
            id: null,
            ...payload,
        });
    }

    public toObject(): {
        id: number;
        userId: number;
        ownerId?: number;
        tokenType: string;
        expiresAt: number;
        accessToken: string;
        refreshToken: string;
        scope: string;
        provider: ValueOf<typeof OAuthProvider>;
    } {
        return {
            id: this.id as number,
            userId: this.userId,
            ownerId: this.ownerId as number,
            tokenType: this.tokenType,
            expiresAt: this.expiresAt,
            accessToken: this.accessToken,
            refreshToken: this.refreshToken,
            scope: this.scope,
            provider: this.provider,
        };
    }

    public toNewObject(): {
        userId: number;
        ownerId?: number;
        tokenType: string;
        expiresAt: number;
        accessToken: string;
        refreshToken: string;
        scope: string;
        provider: ValueOf<typeof OAuthProvider>;
    } {
        return {
            userId: this.userId,
            ownerId: this.ownerId as number,
            tokenType: this.tokenType,
            expiresAt: this.expiresAt,
            accessToken: this.accessToken,
            refreshToken: this.refreshToken,
            scope: this.scope,
            provider: this.provider,
        };
    }

    public toPublicObject(): {
        id: number;
        userId: number;
        scope: string;
        provider: ValueOf<typeof OAuthProvider>;
    } {
        return {
            id: this.id as number,
            userId: this.userId,
            scope: this.scope,
            provider: this.provider,
        };
    }
}

export { OAuthEntity };
