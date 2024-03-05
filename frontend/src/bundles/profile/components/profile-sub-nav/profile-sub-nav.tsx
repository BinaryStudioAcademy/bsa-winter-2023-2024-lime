import { SubNavigation } from '~/bundles/common/components/components.js';

const ProfileNavigation = (): JSX.Element => {
    const routes = [
        {
            id: 'profile',
            label: 'Personal information',
            to: '/profile/information',
        },
        { id: 'connections', label: 'Connections', to: '/profile/connections' },
        {
            id: 'subscription',
            label: 'Subscriptions',
            to: '/profile/subscriptions',
        },
    ];
    return (
        <div>
            <SubNavigation items={routes} className="w-[15rem] px-0" />
        </div>
    );
};

export { ProfileNavigation };
