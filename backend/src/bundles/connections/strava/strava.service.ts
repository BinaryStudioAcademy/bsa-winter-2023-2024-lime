import {
    ErrorMessage,
    HttpCode,
    HttpError,
    OAuthEntity,
    OAuthService,
    Providers,
} from '~/bundles/connections/oauth/oauth.js';
import { snakeToCamel } from '~/common/helpers/helpers.js';

import {
    type StravaOAuthApiResponse,
    type StravaOAuthResponseDto,
} from './types/types.js';

class StravaService extends OAuthService {
    public async create(payload: StravaOAuthApiResponse): Promise<unknown> {
        const mappedPayload = snakeToCamel(payload) as StravaOAuthResponseDto;
        const provider = Providers.STRAVA;

        const connectionExists = await this.oAuthRepository.find({
            userId: mappedPayload.userId,
            provider,
        });

        if (connectionExists) {
            throw new HttpError({
                message: ErrorMessage.CONNECTION_EXISTS,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const oAuthEntity = OAuthEntity.initializeNew({
            ...mappedPayload,
            provider,
        });

        const oAuthInfo = await this.oAuthRepository.create(oAuthEntity);

        return oAuthInfo.toObject();
    }

    public async delete(query: Record<string, unknown>): Promise<boolean> {
        return await this.oAuthRepository.delete({
            ...query,
            provider: Providers.STRAVA,
        });
    }
}

export { StravaService };
