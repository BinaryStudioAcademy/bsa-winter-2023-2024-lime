import {
    ActivityWidget,
    ActivityWidgetColor,
    Card,
    Icon,
    InfoSection,
} from '~/bundles/common/components/components.js';
import {
    IconColor,
    IconName,
} from '~/bundles/common/components/icon/enums/enums.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
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

const Home: React.FC = () => {
    return (
        <div className="ml-auto mr-auto max-w-[1136px] xl:flex xl:gap-8">
            <div className="xl:basis-[70%]">
                <GoalWidget
                    value={4}
                    target={10}
                    goalType={GoalTypes.OVERVIEW}
                    className="mb-6"
                />
                <ul className="mb-6 flex gap-4">
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
                <ChartGoalProgress />
                <div className="mt-5">Achievements</div>
            </div>
            <div className="xl:basis-[30%]">
                <InfoSection
                    title="My Schedule"
                    viewAllLink={AppRoute.SCHEDULE}
                    className="mb-14"
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
                <InfoSection
                    title="Goals"
                    viewAllLink={AppRoute.GOALS}
                    className="mb-12"
                >
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
                <InfoSection title="Recommended for you">
                    Recomendations
                </InfoSection>
            </div>
        </div>
    );
};

export { Home };
