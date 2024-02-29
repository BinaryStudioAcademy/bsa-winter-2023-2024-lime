import '~/assets/css/styles.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '~/app/app.js';
import { Auth } from '~/bundles/auth/pages/auth.js';
import {
    DownloadBanner,
    NotificationContainer,
    RouterProvider,
    StoreProvider,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { NotFound } from '~/bundles/common/pages/pages.js';
import { PasswordReset } from '~/bundles/password-reset/pages/password-reset.js';
import { store } from '~/framework/store/store.js';

import { BaseLayout } from './bundles/common/components/base-layout/base-layout.js';
import { ProfileLayout } from './bundles/profile/layout/profile-layout.js';
import { ConnectionsPage } from './bundles/profile/pages/connections-page/connections-page.js';
import {
    SubscriptionCheckout,
    SubscriptionPage,
} from './bundles/subscription/subscription.js';

const routes = [
    {
        path: AppRoute.ROOT,
        element: <App />,
        children: [
            {
                path: AppRoute.SIGN_IN,
                element: <Auth />,
            },
            {
                path: AppRoute.SIGN_UP,
                element: <Auth />,
            },
            {
                path: AppRoute.ROOT,
                element: <BaseLayout />,
                isPrivate: true,
                children: [
                    {
                        path: AppRoute.ROOT,
                        element: 'Root',
                    },
                    {
                        path: AppRoute.GOALS,
                        element: <div>GOALS PAGE</div>,
                    },
                    {
                        path: AppRoute.WORKOUT,
                        element: <div>WORKOUT PAGE</div>,
                    },
                    {
                        path: AppRoute.OVERVIEW,
                        element: <div>Overview</div>,
                    },
                    {
                        path: AppRoute.SCHEDULE,
                        element: <div>SCHEDULE PAGE</div>,
                    },
                    {
                        path: AppRoute.HELP,
                        element: <div>HELP PAGE</div>,
                    },
                    {
                        path: AppRoute.LOGOUT,
                        element: <div>LOGOUT PAGE</div>,
                    },
                ],
            },
            {
                path: AppRoute.SUBSCRIPTION,
                element: <SubscriptionPage />,
            },
            {
                path: AppRoute.SUBSCRIPTION_CHECKOUT,
                element: <SubscriptionCheckout />,
            },
            {
                path: AppRoute.PROFILE,
                element: <ProfileLayout />,
                children: [
                    {
                        path: AppRoute.PROFILE_INFORMATION,
                        element: <div>PROFILE INFORMATION PAGE</div>,
                    },
                    {
                        path: AppRoute.PROFILE_CONECTIONS,
                        element: <ConnectionsPage />,
                    },
                    {
                        path: AppRoute.PROFILE_GOALS,
                        element: <div>PROFILE GOALS PAGE</div>,
                    },
                    {
                        path: AppRoute.PROFILE_PREFERENCES,
                        element: <div>PROFILE PREFERENCES PAGE</div>,
                    },
                ],
            },
        ],
    },
    {
        path: AppRoute.PASSWORD_RESET,
        element: <PasswordReset />,
    },
    {
        path: AppRoute.NOT_FOUND,
        element: <NotFound />,
    },
];

createRoot(document.querySelector('#root') as HTMLElement).render(
    <StrictMode>
        <StoreProvider store={store.instance}>
            <RouterProvider routes={routes} />
            <NotificationContainer />
            <DownloadBanner />
        </StoreProvider>
    </StrictMode>,
);
