/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/padding-line-between-statements */
/* eslint-disable import/no-default-export */
import { type Meta, type StoryObj } from '@storybook/react';

import { RadioStory } from './radio-story.js';

const meta: Meta<typeof RadioStory> = {
    component: RadioStory,
    title: 'Components/Radio',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioStory>;

// eslint-disable-next-line no-restricted-syntax
export const Radio: Story = {
    args: {
        label: 'Radio',
        value: 'radio',
    },
};
