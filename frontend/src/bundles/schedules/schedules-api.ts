import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { type Http } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import { ScheduleApiPath } from './enums/enums.js';
import {
    type ScheduleGetAllResponseDto,
    type ScheduleRequestDto,
    type ScheduleResponseDto,
} from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};
class ScheduleApi extends BaseHttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.SCHEDULES, baseUrl, http, storage });
    }

    public async getAll(): Promise<ScheduleGetAllResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(ScheduleApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<ScheduleGetAllResponseDto>();
    }

    public async createSchedule(
        payload: ScheduleRequestDto,
    ): Promise<ScheduleResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(ScheduleApiPath.ROOT, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );

        return await response.json<ScheduleResponseDto>();
    }

    public async updateSchedule(
        id: string,
        payload: ScheduleRequestDto,
    ): Promise<ScheduleResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(ScheduleApiPath.ID, { id }),
            {
                method: 'PUT',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );

        return await response.json<ScheduleResponseDto>();
    }

    public async deleteSchedule(id: string): Promise<number> {
        const response = await this.load(
            this.getFullEndpoint(ScheduleApiPath.ID, { id }),
            {
                method: 'DELETE',
                hasAuth: true,
            },
        );

        return await response.json<number>();
    }
}

export { ScheduleApi };
