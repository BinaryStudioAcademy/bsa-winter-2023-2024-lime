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

export default meta;
type Story = StoryObj<typeof Avatar>;

const Sandbox: Story = {
    args: {
        size: ComponentSize.SMALL,
    },
};

export { Sandbox };
