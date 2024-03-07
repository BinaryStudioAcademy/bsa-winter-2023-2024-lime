import { SubNavigation } from '~/bundles/common/components/components.js';

const ProfileNavigation = (): JSX.Element => {
    const routes = [
        {
            id: 'profile',
            label: 'Personal information',
            to: '/profile/information',
        },
        { id: 'conections', label: 'Connections', to: '/profile/conections' },
        {
            id: 'subscription',
            label: 'Subscriptions',
            to: '/profile/subscriptions',
        },
    ];
    return (
        <div>
            <SubNavigation items={routes} className="w-[15rem] px-0 py-4 sm:justify-start" />
        </div>
    );
};

export { ProfileNavigation };
