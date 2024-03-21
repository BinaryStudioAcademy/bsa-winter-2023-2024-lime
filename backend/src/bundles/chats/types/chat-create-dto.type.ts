import { type ChatRequestDto } from './types.js';

type ChatCreateDto = ChatRequestDto & { creatorId: number };

export { type ChatCreateDto };
