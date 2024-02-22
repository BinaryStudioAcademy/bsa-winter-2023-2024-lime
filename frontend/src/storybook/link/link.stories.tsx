/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-default-export */
import { type Meta, type StoryObj } from '@storybook/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Link } from '~/bundles/common/components/link/link.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';

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

// eslint-disable-next-line no-restricted-syntax
export const LinkStory: Story = {
    args: {
        to: AppRoute.ROOT,
        children: ' ',
    },
};
