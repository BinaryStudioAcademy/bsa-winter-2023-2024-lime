import { type Meta, type StoryObj } from '@storybook/react';

import { ToggleStory } from './toggle-story.js';

const meta: Meta<typeof ToggleStory> = {
    component: ToggleStory,
    title: 'Components/Toggle',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToggleStory>;

const Sandbox: Story = {
    args: {
        label: 'Toggle',
    },
};

export { Sandbox };
