import { type FormEvent } from 'react';

import { Input } from '~/bundles/common/components/components.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';

const ChatSearchBar = (): JSX.Element => {
    const { control, errors, handleSubmit } = useAppForm({
        defaultValues: { search: '' },
        mode: 'onChange',
    });

    const handleSearchChats = useCallback((): void => {}, []);

    const handleFormChange = useCallback((event_: React.BaseSyntheticEvent): void => {
        void handleSubmit(handleSearchChats)(event_);
    }, [handleSearchChats, handleSubmit]);

    const handleFormSubmit = useCallback(
        (event_: FormEvent<HTMLFormElement>): void => {
            event_.preventDefault();
        }, []);

    return (
        <form onChange={handleFormChange} onSubmit={handleFormSubmit}>
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
