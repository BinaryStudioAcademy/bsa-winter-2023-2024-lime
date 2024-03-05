import { type Meta, type StoryObj } from '@storybook/react';

import { SelectStory } from './select-story.js';

const meta: Meta<typeof SelectStory> = {
    component: SelectStory,
    title: 'Components/Select',
    args: {
        name: 'option',
        options: [
            { label: 'Opt1', value: 'Opt1' },
            { label: 'Opt2', value: 'Opt2' },
            { label: 'Opt3', value: 'Opt3' },
        ],
    },

    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SelectStory>;

const Sandbox: Story = {
    args: {
        label: 'Select',
        isSearchable: true,
        isLoading: false,
        isDisabled: false,
        blurInputOnSelect: true,
    },
};

export { Sandbox };
