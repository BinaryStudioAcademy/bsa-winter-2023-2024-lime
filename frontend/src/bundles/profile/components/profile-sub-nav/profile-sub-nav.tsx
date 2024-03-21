import { SubNavigation } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';

const ProfileNavigation = (): JSX.Element => {
    const routes = [
        {
            id: AppRoute.PROFILE_INFORMATION,
            label: 'Personal information',
            to: AppRoute.PROFILE_INFORMATION,
        },
        {
            id: AppRoute.PROFILE_CONNECTIONS,
            label: 'Connections',
            to: AppRoute.PROFILE_CONNECTIONS,
        },
        {
            id: AppRoute.PROFILE_SUBSCRIPTION,
            label: 'Subscriptions',
            to: AppRoute.PROFILE_SUBSCRIPTION,
        },
    ];
    return (
        <div>
            <SubNavigation
                items={routes}
                className="w-[15rem] px-0 py-4 sm:justify-start"
            />
        </div>
    );
};

export { ProfileNavigation };
