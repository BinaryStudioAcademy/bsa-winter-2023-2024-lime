import { actions as authActions } from '~/bundles/auth/store/auth.js';
import { DataStatus } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks.js';
import { type UserUpdateProfileRequestDto } from '~/bundles/users/users.js';

import { ProfileSettings } from '../components/components.js';

const Profile: React.FC = () => {
    const dispatch = useAppDispatch();
    const { dataStatus } = useAppSelector(({ auth }) => ({
        dataStatus: auth.dataStatus,
    }));
    const isLoading = dataStatus === DataStatus.PENDING;
    const handleProfileUpdate = useCallback(
        (payload: UserUpdateProfileRequestDto): void => {
            void dispatch(authActions.updateUser(payload));
        },
        [dispatch],
    );
    return (
        <ProfileSettings onSubmit={handleProfileUpdate} isLoading={isLoading} />
    );
};

export { Profile };
