import { type Meta, type StoryObj } from '@storybook/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Link } from '~/bundles/common/components/link/link.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';

const meta: Meta<typeof Link> = {
    component: Link,
    title: 'Components/Link',
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
type Story = StoryObj<typeof Link>;

const Sandbox: Story = {
    args: {
        to: AppRoute.ROOT,
        children: ' ',
    },
};

export { Sandbox };
