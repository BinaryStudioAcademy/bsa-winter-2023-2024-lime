import crypto from 'node:crypto';

import { OAuthStateEntity } from '~/bundles/oauth/oauth.js';
import { jwtService } from '~/common/services/services.js';

import {
    type IdentityProvider,
    ErrorMessage,
    HttpCode,
    HttpError,
} from './enums/enums.js';
import {
    IDENTITY_TOKEN_ADDITIONAL,
    IDENTITY_TOKEN_EXPIRATION,
} from './identity.js';
import {
    type IdentityAuthTokenDto,
    type IdentityExchangeAuthCodeDto,
    type IdentityState,
    type IdentityStrategy,
    type OAuthStateRepository,
    type ValueOf,
} from './types/types.js';

type Parameters = {
    strategies: Record<ValueOf<typeof IdentityProvider>, IdentityStrategy>;
    oAuthStateRepository: OAuthStateRepository;
};

class IdentityService {
    private strategies: Record<
        ValueOf<typeof IdentityProvider>,
        IdentityStrategy
    >;

    private oAuthStateRepository: OAuthStateRepository;

    public constructor({ strategies, oAuthStateRepository }: Parameters) {
        this.strategies = strategies;
        this.oAuthStateRepository = oAuthStateRepository;
    }

    public async getAuthorizeRedirectUrl(
        provider: ValueOf<typeof IdentityProvider>,
        referralCode: string | null,
    ): Promise<URL> {
        const oAuthStateEntity = await this.createOAuthState(referralCode);
        const strategy = this.getStrategy(provider);

        return strategy.getAuthorizeRedirectUrl(oAuthStateEntity);
    }

    private async createOAuthState(
        referralCode: string | null,
    ): Promise<OAuthStateEntity> {
        const uuid = crypto.randomUUID();
        const oAuthStateEntity = OAuthStateEntity.initializeNew({
            userId: null,
            uuid,
            referralCode,
        });

        return await this.oAuthStateRepository.create(oAuthStateEntity);
    }

    public async exchangeAuthCode(
        provider: ValueOf<typeof IdentityProvider>,
        payload: IdentityExchangeAuthCodeDto,
    ): Promise<IdentityAuthTokenDto> {
        const strategy = this.getStrategy(provider);
        const isValid = strategy.checkScope(payload.scope);
        if (!isValid) {
            throw new HttpError({
                message: ErrorMessage.INVALID_SCOPE,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const { state: uuid, referralCode } = payload;
        const isStateValid = await this.verifyOAuthState({
            uuid,
            referralCode: referralCode ?? null,
        });
        if (!isStateValid) {
            throw new HttpError({
                status: HttpCode.FORBIDDEN,
                message: ErrorMessage.UNVERIFIED,
            });
        }
        const user = await strategy.exchangeAuthCode(payload);
        const token = await jwtService.createToken(
            { userId: user.id },
            IDENTITY_TOKEN_EXPIRATION,
            IDENTITY_TOKEN_ADDITIONAL,
        );

        return { token };
    }

    private getStrategy(
        provider: ValueOf<typeof IdentityProvider>,
    ): IdentityStrategy {
        return this.strategies[provider];
    }

    private async verifyOAuthState({
        uuid,
        referralCode,
    }: IdentityState): Promise<boolean> {
        const state = await this.oAuthStateRepository.find({
            uuid,
            referralCode,
        });

        return Boolean(state);
    }
}

export { IdentityService };
