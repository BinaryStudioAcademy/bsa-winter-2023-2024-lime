import { type Meta, type StoryObj } from '@storybook/react';

import { CreateGoalForm } from '~/bundles/common/components/create-goal-form/create-goal-form.js';

const meta: Meta<typeof CreateGoalForm> = {
    component: CreateGoalForm,
    title: 'Components/CreateGoalForm',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CreateGoalForm>;

const Sandbox: Story = {};

export { Sandbox };
