import { type Meta, type StoryObj } from '@storybook/react';

import { Modal } from '~/bundles/common/components/modal/modal.js';

const meta: Meta<typeof Modal> = {
    component: Modal,
    title: 'Components/Modal',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

const Sandbox: Story = {
    args: {
        isOpen: true,
        title: 'Modal',
        children: 'Modal children',
    },
};

export { Sandbox };
