import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

import { MESSAGE_DEFAULT_PAYLOAD } from '~/bundles/chats/constants/constants.js';
import { Button, Input } from '~/bundles/common/components/components.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';

type Properties = {
    onSubmit: (payload: typeof MESSAGE_DEFAULT_PAYLOAD) => void;
};

const ChatMessageForm = ({ onSubmit }: Properties): JSX.Element => {
    const { control, errors, handleSubmit, reset } = useAppForm({
        defaultValues: MESSAGE_DEFAULT_PAYLOAD,
    });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
            reset();
        },
        [handleSubmit, onSubmit, reset],
    );

    return (
        <form
            autoComplete="off"
            className="flex h-full items-center gap-2"
            onSubmit={handleFormSubmit}
        >
            <Input
                control={control}
                errors={errors}
                name="message"
                placeholder="Send message"
                label="Send message"
                hasVisuallyHiddenLabel
                rows={1}
                className="w-full rounded-xl"
            />
            <Button
                type="submit"
                size="sm"
                variant="primary"
                label=""
                leftIcon={<PaperAirplaneIcon className="w-6" />}
                className="h-[90%] max-w-[3rem]"
            />
        </form>
    );
};

export { ChatMessageForm };
