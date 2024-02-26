import '~/assets/css/styles.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '~/app/app.js';
import { Auth } from '~/bundles/auth/pages/auth.js';
import {
    NotificationContainer,
    RouterProvider,
    StoreProvider,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { NotFound } from '~/bundles/common/pages/pages.js';
import { store } from '~/framework/store/store.js';

const routes = [
    {
        path: AppRoute.ROOT,
        element: <App />,
        children: [
            {
                path: AppRoute.ROOT,
                element: 'Root',
                isPrivate: true,
            },
            {
                path: AppRoute.SIGN_IN,
                element: <Auth />,
            },
            {
                path: AppRoute.SIGN_UP,
                element: <Auth />,
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
        path: AppRoute.NOT_FOUND,
        element: <NotFound />,
    },
];

createRoot(document.querySelector('#root') as HTMLElement).render(
    <StrictMode>
        <StoreProvider store={store.instance}>
            <RouterProvider routes={routes} />
            <NotificationContainer />
        </StoreProvider>
    </StrictMode>,
);
