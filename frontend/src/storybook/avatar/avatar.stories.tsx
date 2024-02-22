/* eslint-disable import/no-default-export */
/* eslint-disable no-restricted-syntax */

import { type Meta, type StoryObj } from '@storybook/react';

import { store } from '~/framework/store/store.js';

import { Avatar } from '../../bundles/common/components/avatar/avatar.js';
import { StoreProvider } from '../../bundles/common/components/components.js';
import { Size } from '../../bundles/common/enums/size.enum.js';

// eslint-disable-next-line import/no-default-export
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

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Small: Story = {
    args: {
        size: Size.SMALL,
    },
};
export const Medium: Story = {
    args: {
        size: Size.MEDIUM,
    },
};
export const Large: Story = {
    args: {
        size: Size.LARGE,
    },
};
