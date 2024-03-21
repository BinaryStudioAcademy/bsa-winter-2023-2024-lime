import { type Meta, type StoryObj } from '@storybook/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from 'shared';

import { SubNavigation } from '~/bundles/common/components/sub-navigation/sub-navigation.js';

const items = [
    { id: '1', label: 'item 1', to: AppRoute.PROFILE_GOALS },
    { id: '2', label: 'item 2', to: AppRoute.PROFILE_INFORMATION },
    { id: '3', label: 'item 3', to: AppRoute.PROFILE_PREFERENCES },
    { id: '4', label: 'item 4', to: AppRoute.PROFILE_SUBSCRIPTION },
];

const meta: Meta<typeof SubNavigation> = {
    component: SubNavigation,
    title: 'Components/SubNavigation',
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
type Story = StoryObj<typeof SubNavigation>;

const Sandbox: Story = {
    args: {
        items,
        title: 'SubNavigation',
        button: { label: 'Button', onClick() {} },
    },
};

export { Sandbox };
