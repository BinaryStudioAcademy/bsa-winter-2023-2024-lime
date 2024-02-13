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
import { store } from '~/framework/store/store.js';

const routes = [
    {
        path: AppRoute.ROOT,
        element: <App />,
    },
    {
        path: AppRoute.SIGN_IN,
        element: <Auth />,
    },
    {
        path: AppRoute.SIGN_UP,
        element: <Auth />,
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
