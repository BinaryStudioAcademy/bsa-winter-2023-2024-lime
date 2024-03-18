import { type ChatUserResponseDto } from '../types/types.js';

const formatChatName = (companions: ChatUserResponseDto[]): string => {
    return companions
        .map(({ fullName, email }) => fullName ?? email)
        .join(', ');
};

export { formatChatName };
