import { type MessageRequestDto } from './types.js';

type MessageCreateDto = Omit<MessageRequestDto, 'membersId'> & {
    senderId: number | null;
};

export { type MessageCreateDto };
