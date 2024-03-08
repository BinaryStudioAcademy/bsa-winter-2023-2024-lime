import { type Meta, type StoryObj } from '@storybook/react';

import { type AchievementsGetAllResponseDto } from '~/bundles/achievements/types/types.js';
import { AchievementCard } from '~/bundles/common/components/achievement-card/achievement-card.js';

const ACHIEVEMENTS: AchievementsGetAllResponseDto = {
    id: 1,
    name: 'Achievement 1',
    activityType: 'cycling',
    requirement: 3,
    requirementMetric: 'km',
    createdAt: new Date(),
};

const meta: Meta<typeof AchievementCard> = {
    component: AchievementCard,
    title: 'Components/AchievementCard',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AchievementCard>;

const Sandbox: Story = { args: { achievement: ACHIEVEMENTS } };

export { Sandbox };
