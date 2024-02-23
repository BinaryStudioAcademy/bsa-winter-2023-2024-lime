import { type Meta, type StoryObj } from '@storybook/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Header } from '~/bundles/common/components/components.js';

const meta: Meta<typeof Header> = {
    component: Header,
    title: 'Components/Header',
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
type Story = StoryObj<typeof Header>;

const HeaderStory: Story = {};

export { HeaderStory };
