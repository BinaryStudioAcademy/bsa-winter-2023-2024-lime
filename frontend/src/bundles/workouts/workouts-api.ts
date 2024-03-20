import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import {
    type WorkoutShowLastType,
    WorkoutsApiPath,
} from '~/bundles/workouts/enums/enums.js';
import { type WorkoutGetAllResponseDto } from '~/bundles/workouts/types/types.js';
import { type Http } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class WorkoutApi extends BaseHttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.WORKOUTS, baseUrl, http, storage });
    }

    public async getAll(
        showLast?: ValueOf<typeof WorkoutShowLastType>,
    ): Promise<WorkoutGetAllResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(WorkoutsApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
                ...(showLast && { query: { showLast } }),
            },
        );

        return await response.json<WorkoutGetAllResponseDto>();
    }

    public async getUserLastWorkouts(
        userId: string,
    ): Promise<WorkoutGetAllResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(WorkoutsApiPath.USER_ID, { userId }),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return await response.json<WorkoutGetAllResponseDto>();
    }
}

export { WorkoutApi };
