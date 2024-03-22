import { type Meta, type StoryObj } from '@storybook/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
    Header,
    StoreProvider,
} from '~/bundles/common/components/components.js';
import { store } from '~/framework/store/store.js';

const meta: Meta<typeof Header> = {
    component: Header,
    title: 'Components/Header',
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
type Story = StoryObj<typeof Header>;

const Sandbox: Story = {};

export { Sandbox };
