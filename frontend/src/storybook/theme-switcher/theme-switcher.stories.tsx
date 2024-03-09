import { type Meta, type StoryObj } from '@storybook/react';

import { StoreProvider } from '~/bundles/common/components/components.js';
import { ThemeSwitcher } from '~/bundles/common/components/theme-switcher/theme-switcher.js';
import { store } from '~/framework/store/store.js';

const meta: Meta<typeof ThemeSwitcher> = {
    component: ThemeSwitcher,
    title: 'Components/ThemeSwitcher',
    decorators: [
        (Story): JSX.Element => (
            <StoreProvider store={store.instance}>
                <Story />
            </StoreProvider>
        ),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

const Sandbox: Story = {};

export { Sandbox };
