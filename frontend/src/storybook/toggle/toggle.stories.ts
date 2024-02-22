/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/padding-line-between-statements */
/* eslint-disable import/no-default-export */
import { type Meta, type StoryObj } from '@storybook/react';

import { ToggleStory } from './toggle-story.js';

const meta: Meta<typeof ToggleStory> = {
    component: ToggleStory,
    title: 'Components/Toggle',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToggleStory>;

// eslint-disable-next-line no-restricted-syntax
export const Toggle: Story = {
    args: {
        label: 'Toggle',
    },
};
