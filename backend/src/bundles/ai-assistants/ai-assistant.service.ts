import { HttpCode, HttpError } from '~/common/http/http.js';
import { SenderType } from '~/common/services/open-ai/enums/enums.js';
import { type OpenAIService } from '~/common/services/open-ai/open-ai.service.js';

import { type GoalService } from '../goals/goal.service.js';
import { type MessageService } from '../messages/message.service.js';
import {
    type MessageRequestDto,
    type MessageResponseDto,
} from '../messages/types/types.js';
import { type UserAuthResponseDto } from '../users/users.js';
import { MAX_CONTEXT_MESSAGE_LENGTH } from './constants/constants.js';
import { ErrorMessage } from './enums/enums.js';
import {
    getContextMessages,
    getInfoAboutUserContext,
} from './helpers/helpers.js';

class AiAssistantService {
    private openAiService: OpenAIService;

    private messageService: MessageService;

    private goalService: GoalService;

    public constructor(
        openAiService: OpenAIService,
        messageService: MessageService,
        goalService: GoalService,
    ) {
        this.openAiService = openAiService;
        this.messageService = messageService;
        this.goalService = goalService;
    }

    public async sendMessage(
        user: UserAuthResponseDto,
        payload: MessageRequestDto,
    ): Promise<MessageResponseDto> {
        const { chatId, text } = payload;
        if (!chatId) {
            throw new HttpError({
                message: ErrorMessage.AI_CHAT_NOT_FOUND,
                status: HttpCode.INTERNAL_SERVER_ERROR,
            });
        }

        const chatMessages = await this.messageService.findAll({
            query: { chatId },
            limit: MAX_CONTEXT_MESSAGE_LENGTH,
        });

        const userGoal = await this.goalService.findLast({ userId: user.id });

        const infoAboutUserContext = getInfoAboutUserContext({
            user,
            userGoal,
        });

        const contextMessages = getContextMessages(chatMessages.items);

        const responseMessage = await this.openAiService.sendRequest([
            infoAboutUserContext,
            ...contextMessages,
            {
                role: SenderType.USER,
                content: text,
            },
        ]);

        return await this.messageService.create({
            chatId,
            senderId: null,
            text: responseMessage,
        });
    }
}

export { AiAssistantService };
