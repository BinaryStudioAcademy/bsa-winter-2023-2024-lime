import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { type Http } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import { type GoalRequestDto, type GoalResponseDto } from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class GoalsApi extends BaseHttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.AUTH, baseUrl, http, storage });
    }
    public async getGoals(): Promise<GoalResponseDto[]> {
        const response = await this.load(
            this.getFullEndpoint(ApiPath.GOALS, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return await response.json<GoalResponseDto[]>();
    }

    public async createGoal(payload: GoalRequestDto): Promise<GoalResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(ApiPath.GOALS, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );
        return await response.json<GoalResponseDto>();
    }
}

export { GoalsApi };
