import { SubNavigation } from '~/bundles/common/components/components.js';

const ProfileNavigation = (): JSX.Element => {
    const routes = [
        {
            id: 'profile',
            label: 'Personal information',
            to: '/profile/information',
        },
        { id: 'goals', label: 'Fitness goals', to: '/profile/goals' },
        { id: 'preferences', label: 'Preferences', to: '/profile/preferences' },
        { id: 'conections', label: 'Connections', to: '/profile/conections' },
    ];
    return (
        <div>
            <SubNavigation items={routes} className="w-[15rem] px-0" />
        </div>
    );
};

export { ProfileNavigation };
