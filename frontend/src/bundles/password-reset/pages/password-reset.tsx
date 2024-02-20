import authLogo from '~/assets/img/auth-logo.svg';
import { ResetPasswordForm } from '~/bundles/common/components/components.js';
import { AppRoute, DataStatus } from '~/bundles/common/enums/enums.js';
import {
    getUserId,
    getValidClassNames,
} from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useNavigate,
    useParams,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { actions as passwordResetActions } from '~/bundles/password-reset/store/password-reset.js';
import {
    type PasswordResetPayload,
    type PasswordResetRequestDto,
} from '~/bundles/password-reset/types/types.js';

import { PasswordResetSuccessMessage } from '../components/components.js';

const PasswordReset: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { resetToken } = useParams();
    const { userId } = getUserId(resetToken as string);

    const [isPasswordReset, setIsPasswordReset] = useState(false);

    const { dataStatus } = useAppSelector(({ passwordReset }) => ({
        dataStatus: passwordReset.dataStatus,
    }));

    const isLoading = dataStatus === DataStatus.PENDING;

    const handleResetPassword = useCallback(
        (payload: PasswordResetPayload): void => {
            if (!userId) {
                return;
            }

            const resetPayload = {
                id: Number(userId),
                token: resetToken,
                ...payload,
            };
            void dispatch(
                passwordResetActions.resetPassword(
                    resetPayload as PasswordResetRequestDto,
                ),
            );
        },
        [dispatch, resetToken, userId],
    );

    const handleCancel = useCallback((): void => {
        void navigate(AppRoute.SIGN_IN);
    }, [navigate]);

    useEffect(() => {
        if (dataStatus === DataStatus.FULFILLED) {
            setIsPasswordReset(true);
        }
    }, [dataStatus, navigate]);

    const classes = {
        base: 'relative flex flex-col flex-1 bg-lm-black-200 mx-[1rem] my-[1.125rem] rounded-[2.75rem] lg:flex-none lg:w-[44rem]',
        form: 'gap-6 text-white px-[2rem] pb-[3.75rem] pt-[10rem] lg:px-[11.25rem]',
    };

    return (
        <main className="bg-auth flex h-screen flex-col-reverse bg-cover bg-no-repeat lg:flex-row">
            <div className={getValidClassNames(classes.base, classes.form)}>
                <h3 className="text-center text-3xl font-bold leading-8">
                    Set Up Your New Password
                </h3>
                {isPasswordReset ? (
                    <PasswordResetSuccessMessage />
                ) : (
                    <ResetPasswordForm
                        isLoading={isLoading}
                        onSubmit={handleResetPassword}
                        onCancel={handleCancel}
                    />
                )}
            </div>
            <div className="items-center justify-center text-xl text-white sm:hidden md:flex md:flex-1">
                <img src={authLogo} alt="LIME Logo" />
            </div>
        </main>
    );
};

export { PasswordReset };
