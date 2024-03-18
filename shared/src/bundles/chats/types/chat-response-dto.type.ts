import { type ChatUsersResponseDto } from './chat-users-response-dto.type.js';

type ChatResponseDto = {
    id: number;
    isAssistant: boolean;
    users?: ChatUsersResponseDto[] | undefined;
};

export { type ChatResponseDto };
