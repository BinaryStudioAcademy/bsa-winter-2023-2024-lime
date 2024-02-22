import { type Meta, type StoryObj } from '@storybook/react';

import {
    Avatar,
    StoreProvider,
} from '~/bundles/common/components/components.js';
import { Size } from '~/bundles/common/enums/size.enum.js';
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

type Story = StoryObj<typeof Avatar>;

const Small: Story = {
    args: {
        size: Size.SMALL,
    },
};
const Medium: Story = {
    args: {
        size: Size.MEDIUM,
    },
};
const Large: Story = {
    args: {
        size: Size.LARGE,
    },
};

export { Large, Medium, meta, Small };
