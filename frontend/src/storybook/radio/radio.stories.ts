import { type Meta, type StoryObj } from '@storybook/react';

import { RadioStory } from './radio-story.js';

const meta: Meta<typeof RadioStory> = {
    component: RadioStory,
    title: 'Components/Radio',
    tags: ['autodocs'],
};

// eslint-disable-next-line import/no-default-export
export default meta;
type Story = StoryObj<typeof RadioStory>;

const Radio: Story = {
    args: {
        label: 'Radio',
        value: 'radio',
    },
};

export { Radio };
