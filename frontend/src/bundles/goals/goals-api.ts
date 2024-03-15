import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { GoalsApiPath } from '~/bundles/goals/enums/enums.js';
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
        super({ path: ApiPath.GOALS, baseUrl, http, storage });
    }
    public async getGoals(): Promise<GoalResponseDto[]> {
        const response = await this.load(
            this.getFullEndpoint(GoalsApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        const { items } = await response.json<{ items: GoalResponseDto[] }>();
        return items;
    }

    public async getGoalsByUserId(userId: string): Promise<GoalResponseDto[]> {
        const response = await this.load(
            this.getFullEndpoint(GoalsApiPath.USER_ID, { userId }),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        const { items } = await response.json<{ items: GoalResponseDto[] }>();
        return items;
    }

    public async createGoal(payload: GoalRequestDto): Promise<GoalResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(GoalsApiPath.ROOT, {}),
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
