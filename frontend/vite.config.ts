import { fileURLToPath } from 'node:url';

import reactPlugin from '@vitejs/plugin-react';
import { type ConfigEnv, defineConfig, loadEnv } from 'vite';
import { type VitePWAOptions, VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

const manifestForPlugin: Partial<VitePWAOptions> = {
    devOptions: {
        enabled: true,
    },
    registerType: 'autoUpdate',
    outDir: 'build',
    includeAssets: ['apple-touch-icon.png', 'masked-icon.svg'],
    manifest: {
        name: 'LIME',
        short_name: 'LIME',
        description: 'LIME',
        icons: [
            {
                src: '/pwa/images/android-chrome-192x192.png', // when we will have images we can replace it
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/pwa/images/android-chrome-512x512.png', // when we will have images we can replace it
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/pwa/images/apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png',
                purpose: 'apple touch icon',
            },
            {
                src: '/pwa/images/maskable-icon.png',
                sizes: '225x225',
                type: 'image/png',
                purpose: 'any maskable',
            },
        ],
    },
    workbox: {
        navigateFallbackDenylist: [
            new RegExp('/v1/documentation/static/index.html'),
            new RegExp('/v1/oauth/.*'),
        ],
    },
};

const config = ({ mode }: ConfigEnv): ReturnType<typeof defineConfig> => {
    const {
        VITE_APP_DEVELOPMENT_PORT,
        VITE_APP_API_ORIGIN_URL,
        VITE_APP_PROXY_SERVER_URL,
    } = loadEnv(mode, process.cwd());

    return defineConfig({
        build: {
            outDir: 'build',
        },
        plugins: [reactPlugin(), VitePWA(manifestForPlugin), svgr()],
        server: {
            port: Number(VITE_APP_DEVELOPMENT_PORT),
            proxy: {
                [VITE_APP_API_ORIGIN_URL as string]: {
                    target: VITE_APP_PROXY_SERVER_URL,
                    changeOrigin: true,
                },
            },
        },
        resolve: {
            alias: [
                {
                    find: '~',
                    replacement: fileURLToPath(new URL('src', import.meta.url)),
                },
            ],
        },
    });
};

export default config;
