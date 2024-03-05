import { SubNavigation } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';

const ProfileNavigation = (): JSX.Element => {
    const routes = [
        {
            id: 'profile',
            label: 'Personal information',
            to: AppRoute.PROFILE_INFORMATION,
        },
        {
            id: 'connections',
            label: 'Connections',
            to: AppRoute.PROFILE_CONECTIONS,
        },
        {
            id: 'subscription',
            label: 'Subscriptions',
            to: AppRoute.PROFILE_SUBSCRIPTION,
        },
    ];
    return (
        <div>
            <SubNavigation items={routes} className="w-[15rem] px-0" />
        </div>
    );
};

export { ProfileNavigation };
