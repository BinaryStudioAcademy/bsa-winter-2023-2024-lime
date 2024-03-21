import { type Meta, type StoryObj } from '@storybook/react';

import { ForgotPasswordForm } from '~/bundles/common/components/forgot-password-form/forgot-password-form.js';

const meta: Meta<typeof ForgotPasswordForm> = {
    component: ForgotPasswordForm,
    title: 'Components/ForgotPasswordForm',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ForgotPasswordForm>;

const Sandbox: Story = {};

export { Sandbox };
