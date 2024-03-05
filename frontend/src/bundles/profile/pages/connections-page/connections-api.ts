import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { type Http } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import { ConnectionsPath } from './enums/enums.js';
import { type ConnectionGetAllItemResponseDto } from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class ConnectionApi extends BaseHttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.CONNECTIONS, baseUrl, http, storage });
    }

    public async getAll(): Promise<ConnectionGetAllItemResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(ConnectionsPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<ConnectionGetAllItemResponseDto>();
    }
}

export { ConnectionApi };
