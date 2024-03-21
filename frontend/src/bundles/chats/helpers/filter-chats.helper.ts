import { type ChatPreviewResponseDto } from '../types/types.js';

const filterChats = (
    chats: ChatPreviewResponseDto[],
    search: string,
): ChatPreviewResponseDto[] => {
    return chats.filter((chat) =>
        chat.users.some(
            ({ fullName, email }) =>
                (fullName &&
                    fullName
                        .toLowerCase()
                        .includes(search.trim().toLowerCase())) ||
                (email &&
                    !fullName &&
                    email.toLowerCase().includes(search.trim().toLowerCase())),
        ),
    );
};

export { filterChats };
