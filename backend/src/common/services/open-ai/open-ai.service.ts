import OpenAI from 'openai';
import {
    type ChatCompletion,
    type ChatCompletionCreateParams,
    type ChatCompletionMessageParam,
} from 'openai/resources/index.js';

class OpenAIService {
    private openai: OpenAI;
    private model: string;
    public constructor(apiKey: string, model: string) {
        this.openai = new OpenAI({ apiKey });
        this.model = model;
    }

    public async sendRequest(
        messages: ChatCompletionMessageParam[],
    ): Promise<ChatCompletion> {
        const parameters: ChatCompletionCreateParams = {
            messages,
            model: this.model,
        };
        return this.openai.chat.completions.create(parameters);
    }
}

export { OpenAIService };
