import { Loader } from '~/bundles/common/components/components.js';
import { DataStatus } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
} from '~/bundles/common/hooks/hooks.js';

import { ConnectionOption } from './components/connection-option.js';
import { connectionOptionsData } from './constants/constants.js';
import { actions } from './store/connections.js';

const ConnectionsPage = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const dataStatus = useAppSelector(
        ({ connections }) => connections.dataStatus,
    );

    const isLoading = dataStatus === DataStatus.PENDING;

    useEffect(() => {
        void dispatch(actions.getAll());
    }, [dispatch]);

    return (
        <div className={'relative flex w-full flex-col gap-4'}>
            {isLoading ? (
                <Loader isOverflow />
            ) : (
                connectionOptionsData.map((option, id) => (
                    <ConnectionOption
                        key={id}
                        title={option.title}
                        description={option.description}
                        iconName={option.iconName}
                        provider={option.provider}
                    />
                ))
            )}
        </div>
    );
};

export { ConnectionsPage };
