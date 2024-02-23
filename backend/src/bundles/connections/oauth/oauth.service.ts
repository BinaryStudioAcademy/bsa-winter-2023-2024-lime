import crypto from 'node:crypto';

import { type Service } from '~/common/types/service.type.js';

import { ErrorMessage, HttpCode, HttpError } from './enums/enums.js';
import { type OAuthEntity } from './oauth.entity.js';
import { type OAuthRepository } from './oauth.repository.js';
import { OAuthStateEntity } from './oauth-state.entity.js';
import { type OAuthStateRepository } from './oauth-state.repository.js';
import {
    type ConnectionsOAuthResponseDto,
    type OAuthState,
} from './types/types.js';

abstract class OAuthService implements Service {
    protected oAuthRepository: OAuthRepository;
    protected oAuthStateRepository: OAuthStateRepository;

    public constructor(
        oAuthRepository: OAuthRepository,
        oAuthStateRepository: OAuthStateRepository,
    ) {
        this.oAuthRepository = oAuthRepository;
        this.oAuthStateRepository = oAuthStateRepository;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<ConnectionsOAuthResponseDto | null> {
        const oAuthInfo = await this.oAuthRepository.find(query);

        return oAuthInfo ? oAuthInfo.toObject() : null;
    }

    public async findMany(
        query: Record<string, unknown>,
    ): Promise<{ items: ConnectionsOAuthResponseDto[] }> {
        const items = await this.oAuthRepository.findMany(query);

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async findAll(): Promise<{ items: ConnectionsOAuthResponseDto[] }> {
        const items = await this.oAuthRepository.findAll();

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public abstract create(payload: unknown): Promise<unknown>;

    public update(): Promise<unknown> {
        return Promise.resolve(null);
    }

    public abstract delete(query: Record<string, unknown>): Promise<boolean>;

    public async createOAuthState(userId: number): Promise<OAuthState> {
        const uuid = crypto.randomUUID();
        const stateEntity = OAuthStateEntity.initializeNew({ userId, uuid });
        const state = await this.oAuthStateRepository.create(stateEntity);

        return state.toObject();
    }

    public async verifyState({
        userId,
        uuid,
    }: OAuthState): Promise<OAuthState> {
        const state = await this.oAuthStateRepository.find({ uuid, userId });

        if (!state) {
            throw new HttpError({
                status: HttpCode.UNAUTHORIZED,
                message: ErrorMessage.UNVERIFIED,
            });
        }

        return state.toObject();
    }

    public tokenHasExpired(OAuthEntity: OAuthEntity): boolean {
        const oAuthObject = OAuthEntity.toObject();
        const secondsSinceEpoch = Math.round(Date.now() / 1000);

        return oAuthObject.expiresAt <= secondsSinceEpoch;
    }
}

export { OAuthService };
