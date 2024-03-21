import { type FormEvent } from 'react';

import { SEARCH_DEFAULT_PAYLOAD } from '~/bundles/chats/constants/constants.js';
import { Input } from '~/bundles/common/components/components.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';

type Properties = {
    onSearchChats: (payload: typeof SEARCH_DEFAULT_PAYLOAD) => void;
};

const ChatSearchBar = ({ onSearchChats }: Properties): JSX.Element => {
    const { control, errors, handleSubmit } = useAppForm({
        defaultValues: SEARCH_DEFAULT_PAYLOAD,
        mode: 'onChange',
    });

    const handleFormChange = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSearchChats)(event_);
        },
        [onSearchChats, handleSubmit],
    );

    const handleFormSubmit = useCallback(
        (event_: FormEvent<HTMLFormElement>): void => {
            event_.preventDefault();
        },
        [],
    );

    return (
        <form
            name="search"
            onChange={handleFormChange}
            onSubmit={handleFormSubmit}
        >
            <Input
                placeholder="Find a friend"
                className="h-[3.75rem] justify-center"
                name="search"
                label=""
                control={control}
                errors={errors}
            />
        </form>
    );
};

export { ChatSearchBar };
