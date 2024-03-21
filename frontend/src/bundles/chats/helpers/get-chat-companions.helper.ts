import { type ChatUserResponseDto } from '../types/types.js';

const getChatCompanions = (
    members: ChatUserResponseDto[],
    userId: number,
): ChatUserResponseDto[] => {
    return members.filter((member) => member.id !== userId);
};

export { getChatCompanions };
