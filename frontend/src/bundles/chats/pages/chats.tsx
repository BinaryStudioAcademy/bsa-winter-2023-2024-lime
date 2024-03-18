import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useAppSelector, useParams } from '~/bundles/common/hooks/hooks.js';

import { Chat, ChatSidebar, EmptyChat } from '../components/components.js';

const Chats = (): JSX.Element => {
    const { id } = useParams();

    const { chats, currentChat } = useAppSelector(({ chats }) => chats);

    return (
        <div className="flex h-full flex-[1] flex-col">
            <div className="border-buttonTertiary grid flex-[1] grid-cols-[auto] overflow-hidden rounded-xl border lg:grid-cols-[300px_auto]">
                <ChatSidebar
                    chats={chats}
                    className={getValidClassNames(id && 'hidden lg:flex')}
                />
                <div
                    className={getValidClassNames(
                        id ?? 'hidden lg:flex lg:justify-center',
                        'overflow-hidden',
                    )}
                >
                    {id ? <Chat currentChat={currentChat} /> : <EmptyChat />}
                </div>
            </div>
        </div>
    );
};

export { Chats };
