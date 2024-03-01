import { type Meta, type StoryObj } from '@storybook/react';

import { IconColor } from '~/bundles/common/components/icon/enums/icon-colors.enum.js';
import { Loader } from '~/bundles/common/components/loader/loader.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';

const meta: Meta<typeof Loader> = {
    component: Loader,
    title: 'Components/Loader',
    args: {
        isOverflow: true,
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Loader>;

const Sandbox: Story = {
    args: {
        color: IconColor.PRIMARY,
        size: ComponentSize.SMALL,
    },
};

export { Sandbox };
