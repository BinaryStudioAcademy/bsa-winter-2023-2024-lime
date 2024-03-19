import { type ChatFullResponseDto } from './types.js';

type CurrentChatDto = ChatFullResponseDto & { membersId: number[] };

export { type CurrentChatDto };
