import { useAppDispatch, useEffect } from '~/bundles/common/hooks/hooks.js';

import { ConnectionOption } from './components/connection-option.js';
import { connectionOptionsData } from './constants/constants.js';
import { actions } from './store/connections.js';

const ConnectionsPage = (): JSX.Element => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(actions.getAll());
    }, [dispatch]);

    return (
        <div className={'flex flex-col gap-4'}>
            {connectionOptionsData.map((option, id) => (
                <ConnectionOption
                    key={id}
                    title={option.title}
                    description={option.description}
                    iconName={option.iconName}
                    provider={option.provider}
                />
            ))}
        </div>
    );
};

export { ConnectionsPage };
