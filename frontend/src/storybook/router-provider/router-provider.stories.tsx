import { type Meta, type StoryObj } from '@storybook/react';

import { RouterProvider } from '~/bundles/common/components/router-provider/router-provider.js';
import { type RouteObject } from '~/bundles/common/types/types.js';

const routes: RouteObject[] = [
    {
        path: '/',
        element: 'App',
        children: [
            {
                path: 'root',
                element: 'Root',
            },
            {
                path: '/sign-in',
                element: 'SignIn',
            },
            {
                path: '/sign-up',
                element: 'SignUp',
            },
        ],
    },
    {
        path: '*',
        element: 'NotFound',
    },
];

const meta: Meta<typeof RouterProvider> = {
    component: RouterProvider,
    title: 'Components/RouterProvider',
    tags: ['autodocs'],
};

// eslint-disable-next-line import/no-default-export
export default meta;
type Story = StoryObj<typeof RouterProvider>;

const RouterProviderStory: Story = {
    args: {
        routes,
    },
};

export { RouterProviderStory };
