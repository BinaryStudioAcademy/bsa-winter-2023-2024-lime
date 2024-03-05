import { type Meta, type StoryObj } from '@storybook/react';

import { GoogleAds } from '~/bundles/common/components/google-ads/google-ads.js';

const meta: Meta<typeof GoogleAds> = {
    component: GoogleAds,
    title: 'Components/GoogleAds',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GoogleAds>;

const Sandbox: Story = { args: { children: '' } };

export { Sandbox };
