import { type Meta, type StoryObj } from '@storybook/react';

import {
    Avatar,
    StoreProvider,
} from '~/bundles/common/components/components.js';
import { store } from '~/framework/store/store.js';

const meta: Meta<typeof Avatar> = {
    component: Avatar,
    title: 'Components/Avatar',
    decorators: [
        (Story): JSX.Element => (
            <StoreProvider store={store.instance}>{<Story />}</StoreProvider>
        ),
    ],
    tags: ['autodocs'],
};

// eslint-disable-next-line import/no-default-export
export default meta;
type Story = StoryObj<typeof Avatar>;

const Small: Story = {
    args: {
        size: 'sm',
    },
};
const Medium: Story = {
    args: {
        size: 'md',
    },
};
const Large: Story = {
    args: {
        size: 'lg',
    },
};

export { Large, Medium, Small };
