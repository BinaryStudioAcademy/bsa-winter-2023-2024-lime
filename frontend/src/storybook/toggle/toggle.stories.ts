import { type Meta, type StoryObj } from '@storybook/react';

import { ToggleStory } from './toggle-story.js';

const meta: Meta<typeof ToggleStory> = {
    component: ToggleStory,
    title: 'Components/Toggle',
    tags: ['autodocs'],
};

// eslint-disable-next-line import/no-default-export
export default meta;
type Story = StoryObj<typeof ToggleStory>;

const Toggle: Story = {
    args: {
        label: 'Toggle',
    },
};

export { Toggle };
