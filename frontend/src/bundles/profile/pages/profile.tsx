import { type UserUpdateProfileRequestDto } from 'shared';

import { actions as authActions } from '~/bundles/auth/store/auth.js';
import { DataStatus } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks.js';

import { ProfileSettings } from '../components/components.js';

const Profile: React.FC = () => {
    const dispatch = useAppDispatch();
    const { updateProfile } = useAppSelector(({ auth }) => auth);

    const isLoading = updateProfile.dataStatus === DataStatus.PENDING;
    const handleProfileUpdate = useCallback(
        (payload: UserUpdateProfileRequestDto): void => {
            void dispatch(authActions.updateUser(payload));
        },
        [dispatch],
    );

    const handleAvatarUpload = useCallback(
        (file: File): void => {
            void dispatch(authActions.uploadAvatar(file));
        },
        [dispatch],
    );
    return (
        <ProfileSettings
            onSubmit={handleProfileUpdate}
            onAvatarUpload={handleAvatarUpload}
            isLoading={isLoading}
        />
    );
};

export { Profile };
