import { type Meta, type StoryObj } from '@storybook/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ResetPasswordForm } from '~/bundles/common/components/reset-password-form/reset-password-form.js';

const meta: Meta<typeof ResetPasswordForm> = {
    component: ResetPasswordForm,
    title: 'Components/ResetPasswordForm',
    decorators: [
        (Story): JSX.Element => (
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Story />} />
                </Routes>
            </BrowserRouter>
        ),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ResetPasswordForm>;

const Sandbox: Story = {};

export { Sandbox };
