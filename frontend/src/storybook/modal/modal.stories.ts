/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/padding-line-between-statements */
/* eslint-disable import/no-default-export */
import { type Meta, type StoryObj } from '@storybook/react';

import { Modal } from '~/bundles/common/components/modal/modal.js';

const meta: Meta<typeof Modal> = {
    component: Modal,
    title: 'Components/Modal',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

// eslint-disable-next-line no-restricted-syntax
export const ModalStory: Story = {
    args: {
        isOpen: true,
        title: 'Modal',
        children: 'Modal children',
    },
};
