import { AchievementsApiPath } from '~/bundles/achievements/enums/enums.js';
import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { type Http } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import { type AchievementsGetAllResponseDto } from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class AchievementsApi extends BaseHttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.ACHIEVEMENTS, baseUrl, http, storage });
    }

    public async getAchievements(): Promise<AchievementsGetAllResponseDto[]> {
        const response = await this.load(
            this.getFullEndpoint(AchievementsApiPath.CURRENT_USER, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return await response.json<AchievementsGetAllResponseDto[]>();
    }

    public async getUserAchievements(
        id: string,
    ): Promise<AchievementsGetAllResponseDto[]> {
        const response = await this.load(
            this.getFullEndpoint(AchievementsApiPath.USER_ID, { id }),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return await response.json<AchievementsGetAllResponseDto[]>();
    }
}

export { AchievementsApi };
