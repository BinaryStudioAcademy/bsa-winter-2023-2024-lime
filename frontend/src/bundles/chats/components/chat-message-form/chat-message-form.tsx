import { Button, Input } from '~/bundles/common/components/components.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';

type Properties = {
    onSubmit: (payload: { message: string }) => void;
};

const ChatMessageForm = ({ onSubmit }: Properties): JSX.Element => {
    const { control, errors, handleSubmit, reset } = useAppForm({
        defaultValues: { message: '' },
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
            className="flex gap-2"
            onSubmit={handleFormSubmit}
        >
            <Input
                control={control}
                errors={errors}
                name="message"
                placeholder="Send message"
            />
            <Button
                type="submit"
                size="sm"
                variant="primary"
                label="Send"
                className="w-10"
            />
        </form>
    );
};

export { ChatMessageForm };
