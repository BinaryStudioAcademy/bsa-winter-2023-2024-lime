/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-default-export */
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

export default meta;
type Story = StoryObj<NotificationType>;

export const NotificationStory: Story = {
    args: {
        notification: 'Toastify!',
    },
};
