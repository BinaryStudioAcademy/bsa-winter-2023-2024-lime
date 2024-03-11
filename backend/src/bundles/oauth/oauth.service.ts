import crypto from 'node:crypto';

import { jwtService } from '~/common/services/services.js';

import { MILLISECONDS_PER_SECOND } from './constants/constants.js';
import { OAuthType } from './enums/enums.js';
import {
    type OAuthEntity,
    type OAuthExchangeAuthCodeDto,
    type OAuthProvider,
    type OAuthRepository,
    type OAuthResponseDto,
    type OAuthStateRepository,
    ErrorMessage,
    HttpCode,
    HttpError,
    OAuthStateEntity,
} from './oauth.js';
import {
    type OAuthState,
    type OAuthStrategy,
    type ValueOf,
} from './types/types.js';

type Parameters = {
    strategies: Record<ValueOf<typeof OAuthProvider>, OAuthStrategy>;
    oAuthRepository: OAuthRepository;
    oAuthStateRepository: OAuthStateRepository;
};

class OAuthService {
    private strategies: Record<ValueOf<typeof OAuthProvider>, OAuthStrategy>;

    private oAuthRepository: OAuthRepository;

    private oAuthStateRepository: OAuthStateRepository;

    public constructor({
        strategies,
        oAuthRepository,
        oAuthStateRepository,
    }: Parameters) {
        this.strategies = strategies;
        this.oAuthRepository = oAuthRepository;
        this.oAuthStateRepository = oAuthStateRepository;
    }

    public async findMany(
        query: Record<string, unknown>,
    ): Promise<{ items: OAuthResponseDto[] }> {
        const items = await this.oAuthRepository.findMany(query);

        return {
            items: items.map((it) => it.toPublicObject()),
        };
    }

    public async getAuthorizeRedirectUrl(
        provider: ValueOf<typeof OAuthProvider>,
        type: ValueOf<typeof OAuthType>,
        userId: number | null,
    ): Promise<URL> {
        const oAuthStateEntity = await this.createOAuthState(type, userId);
        const strategy = this.getStrategy(provider);

        return strategy.getAuthorizeRedirectUrl(oAuthStateEntity);
    }

    private async createOAuthState(
        type: ValueOf<typeof OAuthType>,
        userId: number | null,
    ): Promise<OAuthStateEntity> {
        const uuid = crypto.randomUUID();
        const oAuthStateEntity = OAuthStateEntity.initializeNew({
            userId,
            uuid,
            type,
        });

        return await this.oAuthStateRepository.create(oAuthStateEntity);
    }

    public async exchangeAuthCode(
        provider: ValueOf<typeof OAuthProvider>,
        payload: OAuthExchangeAuthCodeDto,
    ): Promise<OAuthEntity> {
        const strategy = this.getStrategy(provider);
        const isValid = strategy.checkScope(payload.scope);
        if (!isValid) {
            throw new HttpError({
                message: ErrorMessage.INVALID_SCOPE,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const { userId, state: uuid, type } = payload;
        const isStateValid = await this.verifyOAuthState({
            userId,
            uuid,
            type,
        });
        if (!isStateValid) {
            throw new HttpError({
                status: HttpCode.FORBIDDEN,
                message: ErrorMessage.UNVERIFIED,
            });
        }

        return await strategy.exchangeAuthCode(payload);
    }

    public async exchangeAuthCodeForIdentity(
        provider: ValueOf<typeof OAuthProvider>,
        payload: OAuthExchangeAuthCodeDto,
    ): Promise<string> {
        const oAuthEntity = await this.exchangeAuthCode(provider, payload);
        const oAuthObject = oAuthEntity.toNewObject();
        const item = await this.oAuthRepository.find({
            userId: oAuthObject.userId,
            provider: oAuthObject.provider,
            type: oAuthObject.type,
        });

        if (!item) {
            const createdOAuthEntity =
                await this.oAuthRepository.create(oAuthEntity);
            const createdOAuth = createdOAuthEntity.toObject();
            return await jwtService.createToken({
                userId: createdOAuth.userId,
            });
        }
        const updatedOAuthEntity = (await this.oAuthRepository.update(
            {
                userId: oAuthObject.userId,
                provider: oAuthObject.provider,
                type: oAuthObject.type,
            },
            oAuthObject,
        )) as OAuthEntity;
        const updatedOAuth = updatedOAuthEntity.toObject();
        return await jwtService.createToken({ userId: updatedOAuth.userId });
    }

    public async exchangeAuthCodeForConnection(
        provider: ValueOf<typeof OAuthProvider>,
        payload: OAuthExchangeAuthCodeDto,
    ): Promise<void> {
        const connectionExists = await this.oAuthRepository.find({
            userId: payload.userId,
            provider,
            type: OAuthType.CONNECTION,
        });
        if (connectionExists) {
            throw new HttpError({
                message: ErrorMessage.CONNECTION_EXISTS,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const oAuthEntity = await this.exchangeAuthCode(provider, payload);
        await this.oAuthRepository.create(oAuthEntity);
    }

    private getStrategy(
        provider: ValueOf<typeof OAuthProvider>,
    ): OAuthStrategy {
        return this.strategies[provider];
    }

    private async verifyOAuthState({
        userId,
        uuid,
        type,
    }: OAuthState): Promise<boolean> {
        const state = await this.oAuthStateRepository.find({
            uuid,
            userId,
            type,
        });

        return Boolean(state);
    }

    public async getAccessToken(
        provider: ValueOf<typeof OAuthProvider>,
        userId: number,
    ): Promise<string | null> {
        const oAuthEntity = await this.oAuthRepository.find({
            provider,
            userId,
        });
        if (!oAuthEntity) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: ErrorMessage.NO_CONNECTION,
            });
        }

        const accessTokenExpired = this.checkAccessToken(oAuthEntity);
        if (accessTokenExpired) {
            const strategy = this.getStrategy(provider);

            const refreshedOAuth =
                await strategy.exchangeRefreshToken(oAuthEntity);
            const updatedOAuth = (await this.oAuthRepository.update(
                { provider, userId },
                refreshedOAuth.toNewObject(),
            )) as OAuthEntity;

            const updatedOAuthObject = updatedOAuth.toObject();
            return updatedOAuthObject.accessToken;
        }

        const oAuthObject = oAuthEntity.toObject();

        return oAuthObject.accessToken;
    }

    public checkAccessToken(oAuthEntity: OAuthEntity): boolean {
        const oAuthObject = oAuthEntity.toObject();
        const secondsSinceEpoch = Math.round(
            Date.now() / MILLISECONDS_PER_SECOND,
        );

        return oAuthObject.expiresAt <= secondsSinceEpoch;
    }

    public async deauthorize(
        provider: ValueOf<typeof OAuthProvider>,
        userId: number,
    ): Promise<void> {
        await this.getAccessToken(provider, userId);

        const oAuthEntity = await this.oAuthRepository.find({
            userId,
            provider,
        });
        if (!oAuthEntity) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: ErrorMessage.NO_CONNECTION,
            });
        }

        const strategy = this.getStrategy(provider);
        await strategy.deauthorize(oAuthEntity);

        await this.oAuthRepository.delete({ userId, provider });
    }
}

export { OAuthService };
