import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type Http } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import {
    type OAuthProvider,
    ConnectionsPath,
    OAuthActionsPath,
} from './enums/enums.js';
import {
    type ConnectionGetAllItemResponseDto,
    type OAuthAuthorizeResponseDto,
} from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class ConnectionApi extends BaseHttpApi {
    private connectionsPath: string;

    private oAuthPath: string;

    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: '', baseUrl, http, storage });

        this.connectionsPath = ApiPath.CONNECTIONS;
        this.oAuthPath = ApiPath.OAUTH;
    }

    public async getAll(): Promise<ConnectionGetAllItemResponseDto> {
        const fullPath = `${this.connectionsPath}${ConnectionsPath.ROOT}`;

        const response = await this.load(this.getFullEndpoint(fullPath, {}), {
            method: 'GET',
            contentType: ContentType.JSON,
            hasAuth: true,
        });

        return await response.json<ConnectionGetAllItemResponseDto>();
    }

    public async authorize(
        provider: ValueOf<typeof OAuthProvider>,
    ): Promise<void> {
        const fullPath = `${this.oAuthPath}/${provider}${OAuthActionsPath.AUTHORIZE}`;

        const response = await this.load(this.getFullEndpoint(fullPath, {}), {
            method: 'GET',
            contentType: ContentType.JSON,
            hasAuth: true,
        });

        const { redirectUrl } =
            await response.json<OAuthAuthorizeResponseDto>();

        window.location.href = redirectUrl;
    }

    public async deauthorize(
        provider: ValueOf<typeof OAuthProvider>,
    ): Promise<void> {
        const fullPath = `${this.oAuthPath}/${provider}${OAuthActionsPath.DEAUTHORIZE}`;

        await this.load(this.getFullEndpoint(fullPath, {}), {
            method: 'GET',
            contentType: ContentType.JSON,
            hasAuth: true,
        });
    }
}

export { ConnectionApi };
