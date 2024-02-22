import { type Meta, type StoryObj } from '@storybook/react';

import { GoogleAds } from '~/bundles/common/components/google-ads/google-ads.js';

const meta: Meta<typeof GoogleAds> = {
    component: GoogleAds,
    title: 'Components/GoogleAds',
    tags: ['autodocs'],
};

// eslint-disable-next-line import/no-default-export
export default meta;
type Story = StoryObj<typeof GoogleAds>;

const AddsStory: Story = { args: { children: '' } };

export { AddsStory };
