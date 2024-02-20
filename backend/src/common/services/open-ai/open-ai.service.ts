import OpenAI from 'openai';
import {
    type ChatCompletion,
    type ChatCompletionCreateParams,
    type ChatCompletionMessageParam,
} from 'openai/resources/index.js';

class OpenAIService {
    private openai: OpenAI;
    public constructor(apiKey: string) {
        this.openai = new OpenAI({ apiKey });
    }

    public async sendRequest(
        messages: ChatCompletionMessageParam[],
    ): Promise<ChatCompletion> {
        const parameters: ChatCompletionCreateParams = {
            messages,
            model: 'gpt-3.5-turbo-0125',
        };
        return this.openai.chat.completions.create(parameters);
    }
}

export { OpenAIService };
