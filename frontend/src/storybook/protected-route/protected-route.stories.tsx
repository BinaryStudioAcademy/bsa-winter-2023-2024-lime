import { type Meta, type StoryObj } from '@storybook/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { StoreProvider } from '~/bundles/common/components/components.js';
import { ProtectedRoute } from '~/bundles/common/components/protected-route/protected-route.js';
import { store } from '~/framework/store/store.js';

const meta: Meta<typeof ProtectedRoute> = {
    component: ProtectedRoute,
    title: 'Components/ProtectedRoute',
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

// eslint-disable-next-line import/no-default-export
export default meta;
type Story = StoryObj<typeof ProtectedRoute>;

const ProtectedStory: Story = {
    args: { children: 'Protected' },
};

export { ProtectedStory };
