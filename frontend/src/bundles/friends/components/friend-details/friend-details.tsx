import { actions as achievementsActions } from '~/bundles/achievements/store/achievements.js';
import { Avatar, Card } from '~/bundles/common/components/components.js';
import { ViewAllButton } from '~/bundles/common/components/info-section/components/view-all-button/view-all-button.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { formatDateString } from '~/bundles/common/helpers/format-date-string/format-date-string.helper.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
} from '~/bundles/common/hooks/hooks.js';

type Properties = {
    id: number;
    name: string;
    isActive: boolean;
    avatarUrl: string | null;
};

const FriendDetails = ({
    id,
    name,
    isActive,
    avatarUrl,
}: Properties): JSX.Element => {
    const dispatch = useAppDispatch();

    const { achievements } = useAppSelector(({ achievements }) => ({
        achievements: achievements.achievements,
    }));

    useEffect(() => {
        void dispatch(achievementsActions.getAchievementsByUserId(id));
    }, [dispatch, id]);

    return (
        <div className={'flex flex-col items-center justify-center '}>
            <div className="mb-4 flex items-center gap-2">
                {isActive ? (
                    <div className="bg-buttonPrimary h-2 w-2 rounded-[50%]" />
                ) : (
                    <div className="bg-buttonTertiary h-2 w-2 rounded-[50%]" />
                )}

                <h3 className="text-primary font-heading font-extrabold font-semibold sm:text-xs lg:text-[1rem]">
                    {name}
                </h3>
            </div>

            <div className={'mb-44'}>
                <Avatar
                    size="xl"
                    email={name || ''}
                    avatarUrl={avatarUrl || ''}
                />
            </div>

            <div className="mb-4 flex w-full items-center justify-between">
                <h3 className="text-lm-grey-200 text-xl font-extrabold leading-6">
                    Achievements
                </h3>
                <ViewAllButton to={AppRoute.PROFILE} />
            </div>

            {achievements.length > 0 && (
                <div className={'flex w-full flex-col gap-4'}>
                    {achievements.map((achievement) => (
                        <Card
                            key={achievement.id}
                            name={achievement.name}
                            data={formatDateString(achievement.createdAt)}
                            chip={
                                achievement.requirement +
                                achievement.requirementMetric
                            }
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export { FriendDetails };
