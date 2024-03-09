import { type Meta, type StoryObj } from '@storybook/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { StoreProvider } from '~/bundles/common/components/components.js';
import { Sidebar } from '~/bundles/common/components/sidebar/sidebar.js';
import { store } from '~/framework/store/store.js';

const meta: Meta<typeof Sidebar> = {
    component: Sidebar,
    title: 'Components/Sidebar',
    decorators: [
        (Story): JSX.Element => (
            <StoreProvider store={store.instance}>
                <BrowserRouter>
                    <Routes>
                        <Route path="*" element={<Story />} />
                    </Routes>
                </BrowserRouter>
            </StoreProvider>
        ),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

const Sandbox: Story = {};

export { Sandbox };
