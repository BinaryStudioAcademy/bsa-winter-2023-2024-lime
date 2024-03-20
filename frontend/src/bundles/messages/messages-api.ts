import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { type Http } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import { MessagePath } from './enums/enums.js';
import {
    type DeleteChatMessagesRequestDto,
    type MessageRequestDto,
    type MessageResponseDto,
} from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class MessagesApi extends BaseHttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.MESSAGES, baseUrl, http, storage });
    }

    public async send(payload: MessageRequestDto): Promise<MessageResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(MessagePath.ROOT, {}),
            {
                method: 'POST',
                payload: JSON.stringify(payload),
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return await response.json<MessageResponseDto>();
    }

    public async find(id: string): Promise<MessageResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(MessagePath.ID, { id }),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return await response.json<MessageResponseDto>();
    }

    public async delete(
        payload: DeleteChatMessagesRequestDto,
    ): Promise<boolean> {
        const response = await this.load(
            this.getFullEndpoint(MessagePath.ID, {
                chatId: String(payload.chatId),
            }),
            {
                method: 'DELETE',
                payload: JSON.stringify(payload),
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return await response.json<boolean>();
    }
}

export { MessagesApi };
