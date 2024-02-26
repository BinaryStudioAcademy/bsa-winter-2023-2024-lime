import crypto from 'node:crypto';

import { type Service } from '~/common/types/service.type.js';

import { ErrorMessage, HttpCode, HttpError } from './enums/enums.js';
import { type OAuthRepository } from './oauth.repository.js';
import { OAuthStateEntity } from './oauth-state.entity.js';
import { type OAuthStateRepository } from './oauth-state.repository.js';
import { type OAuthConnection, type OAuthState } from './types/types.js';

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
    ): Promise<OAuthConnection | null> {
        const oAuthInfo = await this.oAuthRepository.find(query);

        return oAuthInfo ? oAuthInfo.toObject() : null;
    }

    public async findMany(
        query: Record<string, unknown>,
    ): Promise<{ items: OAuthConnection[] }> {
        const items = await this.oAuthRepository.findMany(query);

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async findAll(): Promise<{ items: OAuthConnection[] }> {
        const items = await this.oAuthRepository.findAll();

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async update(
        query: Record<string, unknown>,
        payload: Record<string, unknown>,
    ): Promise<OAuthConnection | null> {
        const updatedOAuthInfo = await this.oAuthRepository.update(
            query,
            payload,
        );

        return updatedOAuthInfo ? updatedOAuthInfo.toObject() : null;
    }

    public async delete(query: Record<string, unknown>): Promise<boolean> {
        return await this.oAuthRepository.delete(query);
    }

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

    public tokenHasExpired(oAuthObject: OAuthConnection): boolean {
        const secondsSinceEpoch = Math.round(Date.now() / 1000);

        return oAuthObject.expiresAt <= secondsSinceEpoch;
    }

    public abstract create(payload: unknown): Promise<unknown>;

    public abstract getToken(userId: number): Promise<string>;

    public abstract refreshToken(payload: unknown): Promise<unknown>;

    public abstract exchangeToken(payload: unknown): Promise<void>;

    public abstract deauthorize(payload: unknown): Promise<void>;
}

export { OAuthService };
