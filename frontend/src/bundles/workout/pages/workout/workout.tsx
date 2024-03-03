import {
    Loader,
    SubNavigation,
} from '~/bundles/common/components/components.js';
import { capitalizeFirstLetter } from '~/bundles/common/helpers/helpers.js';
import {
    useEffect,
    useNavigate,
    useParams,
} from '~/bundles/common/hooks/hooks.js';
import { WorkoutItem } from '~/bundles/workout/components/components.js';
import { ActivityType, AppRoute } from '~/bundles/workout/enums/enums.js';

const items = [
    {
        id: 1,
        activityType: ActivityType.RUNNING,
        workoutStartedAt: new Date(),
        workoutEndedAt: new Date(),
        speed: 100,
        duration: 10_000,
        distance: 1000,
        heartRate: 7171,
        kilocalories: 1000,
    },
    {
        id: 2,
        activityType: ActivityType.CYCLING,
        workoutStartedAt: new Date(),
        workoutEndedAt: new Date(),
        speed: 58,
        duration: 8_747_846,
        distance: 554,
        heartRate: 7171,
        kilocalories: 5356,
    },
    {
        id: 3,
        activityType: ActivityType.WALKING,
        workoutStartedAt: new Date(),
        workoutEndedAt: new Date(),
        speed: 13,
        duration: 1_037_846,
        distance: 887,
        heartRate: 234,
        kilocalories: 1345,
    },
];

const Workout: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const firstWorkoutId = items[0]?.id;

        if (!id) {
            navigate(`${AppRoute.WORKOUT}/${firstWorkoutId}`);
        }
    }, [id, navigate]);

    const subNavigationTitle = 'Workout tracking';

    const isLoading = false;

    const subNavigationItems = items.map((item) => {
        const { id, activityType } = item;

        return {
            id: String(id),
            label: capitalizeFirstLetter(activityType),
            to: String(id),
        };
    });

    return (
        <section className="relative flex h-full">
            {isLoading ? (
                <Loader isOverflow />
            ) : (
                <div className="flex w-full">
                    <SubNavigation
                        title={subNavigationTitle}
                        items={subNavigationItems}
                    />
                    <div className="border-lm-black-400 h-full border"></div>
                    <WorkoutItem />
                </div>
            )}
        </section>
    );
};

export { Workout };
