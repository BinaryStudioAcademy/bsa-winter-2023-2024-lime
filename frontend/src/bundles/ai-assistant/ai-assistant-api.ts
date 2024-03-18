import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { type Http } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import { AiAssistantPath } from './enums/enums.js';
import {
    type SendAiMessageRequestDto,
    type SendAiMessageResponseDto,
} from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class AiAssistantApi extends BaseHttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.AI_ASSISTANT, baseUrl, http, storage });
    }

    public async getAiResponse(
        payload: SendAiMessageRequestDto,
    ): Promise<SendAiMessageResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(AiAssistantPath.SEND_MESSAGE, {}),
            {
                method: 'POST',
                payload: JSON.stringify(payload),
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return await response.json<SendAiMessageResponseDto>();
    }
}

export { AiAssistantApi };
