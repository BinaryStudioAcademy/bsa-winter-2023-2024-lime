import { type Meta, type StoryObj } from '@storybook/react';

import {
    Avatar,
    StoreProvider,
} from '~/bundles/common/components/components.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
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
        size: ComponentSize.SMALL,
    },
};
const Medium: Story = {
    args: {
        size: ComponentSize.MEDIUM,
    },
};
const Large: Story = {
    args: {
        size: ComponentSize.LARGE,
    },
};

export { Large, Medium, Small };
