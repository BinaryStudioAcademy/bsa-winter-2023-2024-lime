/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-default-export */
import { type Meta, type StoryObj } from '@storybook/react';

import { DatePickerStory } from './date-picker-story.js';

const meta: Meta<typeof DatePickerStory> = {
    component: DatePickerStory,
    title: 'Components/Date',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DatePickerStory>;

// eslint-disable-next-line no-restricted-syntax
export const DateStory: Story = {
    args: {
        label: 'Date',
        placeholder: 'Pick a date',
        className: 'w-80',
    },
};
