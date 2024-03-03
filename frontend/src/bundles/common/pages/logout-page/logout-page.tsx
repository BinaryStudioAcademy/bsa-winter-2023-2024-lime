import { actions as authActions } from '~/bundles/auth/store/auth.js';
import {
    Button,
    ButtonVariant,
} from '~/bundles/common/components/button/button.js';
import { Modal } from '~/bundles/common/components/modal/modal.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import {
    useAppDispatch,
    useCallback,
    useNavigate,
} from '~/bundles/common/hooks/hooks.js';

const LogoutPage = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = useCallback((): void => {
        void dispatch(authActions.logout());
    }, [dispatch]);

    const handleGoBack = useCallback((): void => {
        void navigate(-1);
    }, [navigate]);

    return (
        <div className={'flex flex-col gap-4'}>
            <Modal
                isOpen={true}
                title="Are you sure you want to leave?"
                onClose={handleGoBack}
            >
                <div className={'flex gap-4'}>
                    <Button
                        size={ComponentSize.MEDIUM}
                        variant={ButtonVariant.PRIMARY}
                        label={'Leave'}
                        onClick={handleLogout}
                    />
                    <Button
                        size={ComponentSize.MEDIUM}
                        variant={ButtonVariant.PRIMARY}
                        label={'Cancel'}
                        onClick={handleGoBack}
                    />
                </div>
            </Modal>
        </div>
    );
};

export { LogoutPage };
