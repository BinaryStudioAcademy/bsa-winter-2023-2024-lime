import { DataStatus } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks.js';

import { actions as authActions } from '../../auth/store/auth.js';
import { ProfileSettings } from '../components/components.js';

const Profile: React.FC = () => {
    const dispatch = useAppDispatch();
    const { dataStatus } = useAppSelector(({ auth }) => ({
        dataStatus: auth.dataStatus,
    }));
    const isLoading = dataStatus === DataStatus.PENDING;
    const handleProfileUpdate = useCallback(
        (payload: FormData): void => {
            void dispatch(authActions.updateUser(payload));
        },
        [dispatch],
    );
    return (
        <ProfileSettings onSubmit={handleProfileUpdate} isLoading={isLoading} />
    );
};

export { Profile };
