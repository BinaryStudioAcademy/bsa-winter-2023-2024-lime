import { fileURLToPath } from 'node:url';

import reactPlugin from '@vitejs/plugin-react';
import { type ConfigEnv, defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

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
        plugins: [
            reactPlugin(),
            VitePWA({
                registerType: 'autoUpdate',
                manifest: {
                    name: 'My Awesome App',
                    short_name: 'MyApp',
                    description: 'My Awesome App description',
                    theme_color: '#ffffff',
                    icons: [
                        {
                            'src': 'public/512.png',
                            'type': 'image/png',
                            'sizes': '512x512'
                        }
                    ],
                    start_url: '.',
                    background_color: '#FFFFFF',
                    display: 'standalone',
                    scope: '/',
                    lang: 'en'
                }
            })
        ],
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
