import { type MessageRequestDto } from './types.js';

type MessageCreateDto = MessageRequestDto & { senderId: number | null };

export { type MessageCreateDto };
