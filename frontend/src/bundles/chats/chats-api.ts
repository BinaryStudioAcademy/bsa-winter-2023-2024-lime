import {
    type ChatGetAllItemsResponseDto,
    type ChatResponseDto,
} from '~/bundles/chats/types/types.js';
import { type Http } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import { ApiPath, ContentType } from '../common/enums/enums.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class ChatsApi extends BaseHttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.CHATS, baseUrl, http, storage });
    }

    public async getAllChats(): Promise<ChatGetAllItemsResponseDto> {
        const response = await this.load(this.getFullEndpoint('/', {}), {
            method: 'GET',
            contentType: ContentType.JSON,
            hasAuth: true,
        });

        return await response.json<ChatGetAllItemsResponseDto>();
    }

    public async getChat(chatId: string): Promise<ChatResponseDto> {
        const response = await this.load(
            this.getFullEndpoint('/:id', { chatId }),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return await response.json<ChatResponseDto>();
    }
}

export { ChatsApi };
