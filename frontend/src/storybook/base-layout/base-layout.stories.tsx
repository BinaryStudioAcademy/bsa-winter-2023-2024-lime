import { type Meta, type StoryObj } from '@storybook/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { BaseLayout } from '~/bundles/common/components/base-layout/base-layout.js';
import { StoreProvider } from '~/bundles/common/components/components.js';
import { store } from '~/framework/store/store.js';

const meta: Meta<typeof BaseLayout> = {
    component: BaseLayout,
    title: 'Components/BaseLayout',
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
type Story = StoryObj<typeof BaseLayout>;

const Sandbox: Story = {
    args: { children: '' },
};

export { Sandbox };
