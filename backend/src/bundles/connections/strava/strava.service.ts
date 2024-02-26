import axios from 'axios';

import {
    type OAuthClient,
    type OAuthConnection,
    type OAuthRepository,
    type OAuthStateRepository,
    ErrorMessage,
    HttpCode,
    HttpError,
    OAuthEntity,
    OAuthService,
    Providers,
} from '~/bundles/connections/oauth/oauth.js';
import { snakeToCamel } from '~/common/helpers/helpers.js';

import { StravaPaths } from './enums/enums.js';
import {
    type StravaOAuthApiResponse,
    type StravaOAuthResponseDto,
} from './types/types.js';

type Parameters = {
    oAuthRepository: OAuthRepository;
    oAuthStateRepository: OAuthStateRepository;
    clientConfig: OAuthClient;
};

class StravaService extends OAuthService {
    private provider = Providers.STRAVA;

    private clientConfig: OAuthClient;

    public constructor({
        oAuthRepository,
        oAuthStateRepository,
        clientConfig,
    }: Parameters) {
        super(oAuthRepository, oAuthStateRepository);

        this.clientConfig = clientConfig;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<OAuthConnection | null> {
        return await super.find({ ...query, provider: this.provider });
    }

    public async create(
        payload: StravaOAuthApiResponse,
    ): Promise<OAuthConnection> {
        const mappedPayload = snakeToCamel(payload) as StravaOAuthResponseDto;

        const connectionExists = await this.oAuthRepository.find({
            userId: mappedPayload.userId,
            provider: this.provider,
        });

        if (connectionExists) {
            throw new HttpError({
                message: ErrorMessage.CONNECTION_EXISTS,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const oAuthEntity = OAuthEntity.initializeNew({
            ...mappedPayload,
            provider: this.provider,
        });

        const oAuthInfo = await this.oAuthRepository.create(oAuthEntity);

        return oAuthInfo.toObject();
    }

    public async delete(query: Record<string, unknown>): Promise<boolean> {
        return await super.delete({
            ...query,
            provider: Providers.STRAVA,
        });
    }

    public async getToken(userId: number): Promise<string> {
        const oAuthInfo = await this.find({ userId });

        if (!oAuthInfo) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: ErrorMessage.NO_CONNECTION,
            });
        }

        const tokenHasExpired = this.tokenHasExpired(oAuthInfo);

        if (tokenHasExpired) {
            const refreshedOAuthInfo = await this.refreshToken(oAuthInfo);

            return refreshedOAuthInfo.accessToken;
        }

        return oAuthInfo.accessToken;
    }

    public async refreshToken(
        oAuthObject: OAuthConnection,
    ): Promise<OAuthConnection> {
        const { userId, refreshToken } = oAuthObject;

        const config = {
            client_id: this.clientConfig.CLIENT_ID,
            client_secret: this.clientConfig.CLIENT_SECRET,
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        };

        const oAuthResponse = await axios.post(
            StravaPaths.REFRESH_TOKEN,
            config,
        );

        const responseData = snakeToCamel(
            oAuthResponse.data,
        ) as StravaOAuthResponseDto;

        const updatedOAuthInfo = await super.update(
            { userId, provider: this.provider },
            responseData,
        );

        if (!updatedOAuthInfo) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: ErrorMessage.NO_CONNECTION,
            });
        }

        return updatedOAuthInfo;
    }
}

export { StravaService };
