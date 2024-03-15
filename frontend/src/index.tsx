import '~/assets/css/styles.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '~/app/app.js';
import { Auth } from '~/bundles/auth/pages/auth.js';
import { Identity } from '~/bundles/auth/pages/identity.js';
import {
    DownloadBanner,
    NotificationContainer,
    RouterProvider,
    StoreProvider,
    ThemeSwitcher,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { NotFound } from '~/bundles/common/pages/pages.js';
import { Friends } from '~/bundles/friends/pages/pages.js';
import { Goals as GoalsPage } from '~/bundles/goals/pages/goals.js';
import { PasswordReset } from '~/bundles/password-reset/pages/password-reset.js';
import { Profile } from '~/bundles/profile/pages/profile.js';
import { Workout, WorkoutItem } from '~/bundles/workouts/pages/pages.js';
import { store } from '~/framework/store/store.js';

import { Chats } from './bundles/chats/pages/chats.js';
import { BaseLayout } from './bundles/common/components/base-layout/base-layout.js';
import { Landing } from './bundles/landing/pages/landing.js';
import { Overview } from './bundles/overview/pages/overview.js';
import { ProfileLayout } from './bundles/profile/layout/profile-layout.js';
import { ConnectionsPage } from './bundles/profile/pages/connections-page/connections-page.js';
import { PublicProfile } from './bundles/profile/pages/public-profile-page/public-profile-page.js';
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
                path: AppRoute.ROOT,
                element: <Landing />,
            },
            {
                path: AppRoute.SIGN_IN,
                element: <Auth />,
            },
            {
                path: AppRoute.IDENTITY_$TOKEN,
                element: <Identity />,
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
                        path: AppRoute.OVERVIEW,
                        element: <Overview />,
                    },
                    {
                        path: AppRoute.GOALS,
                        element: <GoalsPage />,
                    },
                    {
                        path: AppRoute.WORKOUT,
                        element: <Workout />,
                        children: [
                            {
                                path: AppRoute.WORKOUT_$ID,
                                element: <WorkoutItem />,
                            },
                        ],
                    },
                    {
                        path: AppRoute.SCHEDULE,
                        element: <div>SCHEDULE PAGE</div>,
                    },
                    {
                        path: AppRoute.FRIENDS,
                        element: <Friends />,
                    },
                    {
                        path: AppRoute.HELP,
                        element: <div>HELP PAGE</div>,
                    },
                    {
                        path: AppRoute.CHATS,
                        element: <Chats />,
                    },
                    {
                        path: AppRoute.CHATS_$ID,
                        element: <Chats />,
                    },
                    {
                        element: <ProfileLayout />,
                        children: [
                            {
                                path: AppRoute.PROFILE_INFORMATION,
                                element: <Profile />,
                            },
                            {
                                path: AppRoute.PROFILE_CONNECTIONS,
                                element: <ConnectionsPage />,
                            },
                            {
                                path: AppRoute.PROFILE_SUBSCRIPTION,
                                element: <SubscriptionPage />,
                            },
                            {
                                path: AppRoute.PROFILE_SUBSCRIPTION_CHECKOUT,
                                element: <SubscriptionCheckout />,
                            },
                        ],
                    },
                    {
                        path: AppRoute.PROFILE_PUBLIC_$ID,
                        element: <PublicProfile />,
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
            <ThemeSwitcher />
        </StoreProvider>
    </StrictMode>,
);
