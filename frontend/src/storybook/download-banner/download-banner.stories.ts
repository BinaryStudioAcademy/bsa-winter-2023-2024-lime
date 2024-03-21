import { type Meta, type StoryObj } from '@storybook/react';

import { DownloadBanner } from '~/bundles/common/components/download-banner/download-banner.js';

const meta: Meta<typeof DownloadBanner> = {
    component: DownloadBanner,
    title: 'Components/DownloadBanner',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DownloadBanner>;

const Sandbox: Story = {};

export { Sandbox };
