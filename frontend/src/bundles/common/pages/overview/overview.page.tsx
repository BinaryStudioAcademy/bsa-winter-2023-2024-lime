import {
    ActivityWidget,
    ActivityWidgetColor,
    AdvertisementBanner,
    Card,
    Icon,
    InfoSection,
} from '~/bundles/common/components/components.js';
import {
    IconColor,
    IconName,
} from '~/bundles/common/components/icon/enums/enums.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';
import {
    ChartGoalProgress,
    GoalWidget,
} from '~/bundles/overview/components/components.js';
import { GoalTypes } from '~/bundles/overview/components/goal-widget/enums/goal-types.enums.js';

import styles from './styles.module.css';

const scheduleData = [
    {
        id: 1,
        title: 'Monday',
        name: 'Stretch',
        data: 'At 08:00',
        chip: '20 Pieces',
    },
    {
        id: 2,
        title: 'Wednesday',
        name: 'Yoga',
        data: 'At 08:00',
        chip: '10 min',
    },
    {
        id: 3,
        title: 'Tuesday',
        name: 'Back Stretch',
        data: 'At 08:00',
        chip: '10 Round',
    },
];

const goalsData = [
    {
        id: 1,
        name: 'Running on Track',
        data: 'Saturday, April 14 | 08:00 AM',
        chip: '04 Rounds',
    },
    {
        id: 2,
        name: 'Push Up',
        data: 'Sunday, April 15 | 08:00 AM',
        chip: '50 Pieces',
    },
];

const Overview: React.FC = () => {
    const isSubscribed = useAppSelector(
        ({ subscriptions }) => subscriptions.currentSubscription,
    );

    return (
        <div className="justify-center gap-8 xl:flex">
            {!isSubscribed && (
                <AdvertisementBanner className="bg-lm-red hidden max-w-64 flex-1 2xl:flex" />
            )}
            <div className="max-w-[1136px] flex-1 xl:flex xl:gap-8 2xl:basis-[1136px]">
                <div className="xl:basis-[68%]">
                    <GoalWidget
                        value={4}
                        target={10}
                        goalType={GoalTypes.OVERVIEW}
                        className="mb-6"
                    />
                    <ul className="mb-6 flex flex-col gap-4 min-[600px]:flex-row md:flex-col min-[840px]:flex-row">
                        <li className="flex-1">
                            <ActivityWidget
                                label="Workout"
                                value="4 hrs"
                                color={ActivityWidgetColor.YELLOW}
                                icon={
                                    <Icon
                                        name={IconName.workoutIcon}
                                        color={IconColor.SECONDARY}
                                    />
                                }
                            />
                        </li>
                        <li className="flex-1">
                            <ActivityWidget
                                label="Calories"
                                value="1800 kcl"
                                color={ActivityWidgetColor.MAGENTA}
                                icon={<Icon name={IconName.caloriesIcon} />}
                            />
                        </li>
                        <li className="flex-1">
                            <ActivityWidget
                                label="Steps"
                                value="2200 steps"
                                color={ActivityWidgetColor.PURPLE}
                                icon={<Icon name={IconName.stepsIcon} />}
                            />
                        </li>
                    </ul>
                    {!isSubscribed && (
                        <AdvertisementBanner className="bg-lm-red mb-6 hidden h-44 xl:flex" />
                    )}
                    <ChartGoalProgress />
                    <div className="mt-5">Achievements</div>
                </div>
                <div className="xl:basis-[32%]">
                    <InfoSection
                        title="My Schedule"
                        viewAllLink={AppRoute.SCHEDULE}
                        className={isSubscribed ? 'mb-14' : 'mb-5'}
                    >
                        {scheduleData.length > 0 ? (
                            <ul>
                                {scheduleData.map((scheduleItem) => (
                                    <li
                                        className={styles['schedule__item']}
                                        key={scheduleItem.id}
                                    >
                                        <Card {...scheduleItem} />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Empty schedule</p>
                        )}
                    </InfoSection>
                    {!isSubscribed && (
                        <AdvertisementBanner className="bg-lm-red mb-5 h-48" />
                    )}
                    <InfoSection title="Goals" viewAllLink={AppRoute.GOALS}>
                        {goalsData.length > 0 ? (
                            <ul>
                                {goalsData.map((goalItem) => (
                                    <li
                                        className={styles['goal__item']}
                                        key={goalItem.id}
                                    >
                                        <Card {...goalItem} />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Empty goals</p>
                        )}
                    </InfoSection>
                </div>
            </div>
            {!isSubscribed && (
                <AdvertisementBanner className="bg-lm-red hidden max-w-64 flex-1 2xl:flex" />
            )}
        </div>
    );
};

export { Overview };
