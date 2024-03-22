import { type Meta, type StoryObj } from '@storybook/react';

import { DatePickerStory } from './date-picker-story.js';

const meta: Meta<typeof DatePickerStory> = {
    component: DatePickerStory,
    title: 'Components/Date',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DatePickerStory>;

const Sandbox: Story = {
    args: {
        label: 'Date',
        placeholder: 'Pick a date',
        className: 'w-80',
    },
};

export { Sandbox };
