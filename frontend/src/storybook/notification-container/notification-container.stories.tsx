import { type Meta, type StoryObj } from '@storybook/react';
import { toast } from 'react-toastify';

import { NotificationContainer } from '~/bundles/common/components/notification-container/notification-container.js';

type NotificationType = React.ComponentProps<typeof NotificationContainer> & {
    notification?: string;
};

const meta: Meta<NotificationType> = {
    component: NotificationContainer,
    title: 'Components/NotificationContainer',
    render: ({ notification }) => (
        <>
            <button
                // eslint-disable-next-line react/jsx-no-bind
                onClick={() => toast(notification)}
                className="bg-lm-yellow-100 rounded-md p-1 px-3"
            >
                Click to notify
            </button>
            <NotificationContainer />
        </>
    ),
    tags: ['autodocs'],
};

// eslint-disable-next-line import/no-default-export
export default meta;
type Story = StoryObj<NotificationType>;

const NotificationStory: Story = {
    args: {
        notification: 'Toastify!',
    },
};

export { NotificationStory };
