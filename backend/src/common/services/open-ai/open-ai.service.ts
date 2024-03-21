import OpenAI from 'openai';
import {
    type ChatCompletionCreateParams,
    type ChatCompletionMessageParam,
} from 'openai/resources/index.js';

import { HttpCode, HttpError } from '~/common/http/http.js';

import { AssistantParameters, SenderType } from './enums/enums.js';

class OpenAIService {
    private openai: OpenAI;
    private model: string;
    public constructor(apiKey: string, model: string) {
        this.openai = new OpenAI({ apiKey });
        this.model = model;
    }

    public async sendRequest(
        messages: ChatCompletionMessageParam[],
    ): Promise<string> {
        const parameters: ChatCompletionCreateParams = {
            messages: [
                {
                    role: SenderType.ASSISTANT,
                    content: AssistantParameters.INSTRUCTIONS,
                },
                ...messages,
            ],
            model: this.model,
            temperature: AssistantParameters.TEMPERATURE,
            max_tokens: AssistantParameters.MAX_TOKENS,
        };

        const response = await this.openai.chat.completions.create(parameters);

        const [choice] = response.choices;

        if (!choice || !choice.message.content) {
            throw new HttpError({
                message: 'No response',
                status: HttpCode.INTERNAL_SERVER_ERROR,
            });
        }

        return choice.message.content;
    }
}

export { OpenAIService };
