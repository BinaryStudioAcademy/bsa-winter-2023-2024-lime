import authLogo from '~/assets/img/auth-logo.svg';
import {
    ResetPasswordForm,
    ThemeSwitcher,
} from '~/bundles/common/components/components.js';
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
import { PasswordResetSuccessMessage } from '~/bundles/password-reset/components/components.js';
import { ERROR_MESSAGE_TEXT } from '~/bundles/password-reset/constants/constants.js';
import { actions as passwordResetActions } from '~/bundles/password-reset/store/password-reset.js';
import {
    type PasswordResetPayload,
    type PasswordResetRequestDto,
} from '~/bundles/password-reset/types/types.js';
import { notificationManager } from '~/framework/notification/notification.js';

const PasswordReset: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { resetToken } = useParams();
    const { userId, exp } = getUserId(resetToken as string);

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

    useEffect(() => {
        if (dataStatus === DataStatus.FULFILLED) {
            setIsPasswordReset(true);
        }
    }, [dataStatus]);

    useEffect(() => {
        if (Date.now() >= Number(exp) * 1000) {
            navigate(AppRoute.SIGN_IN);
            notificationManager.error(ERROR_MESSAGE_TEXT);
        }
    }, [exp, navigate]);

    const classes = {
        main: 'bg-auth flex h-screen flex-col-reverse bg-cover bg-no-repeat lg:flex-row',
        base: 'relative flex flex-col flex-1 mx-[1rem] my-[1.125rem] rounded-[2.75rem] bg-primary lg:flex-none lg:w-[45rem]',
        form: 'items-center justify-center text-primary px-[2rem] lg:px-[11rem] lg:justify-center pt-0 pb-0',
    };

    return (
        <main className={classes.main}>
            <div className={getValidClassNames(classes.base, classes.form)}>
                {isPasswordReset ? (
                    <PasswordResetSuccessMessage />
                ) : (
                    <ResetPasswordForm
                        isLoading={isLoading}
                        onSubmit={handleResetPassword}
                    />
                )}
            </div>
            <div className="text-primary hidden flex-1 items-center justify-center text-xl lg:flex">
                <img src={authLogo} alt="LIME Logo" />
            </div>
            <ThemeSwitcher className="absolute bottom-4 right-4" />
        </main>
    );
};

export { PasswordReset };
