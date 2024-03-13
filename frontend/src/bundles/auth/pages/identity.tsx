import { actions as appActions } from '~/app/store/app.js';
import { type IdentityAuthTokenDto } from '~/bundles/auth/auth.js';
import { actions as authActions } from '~/bundles/auth/store/auth.js';
import { Loader } from '~/bundles/common/components/components.js';
import { AppRoute, DataStatus } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
    useParams,
} from '~/bundles/common/hooks/hooks.js';

const Identity = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const { token } = useParams();
    const { user, dataStatus } = useAppSelector(({ auth }) => auth);

    useEffect(() => {
        if (token) {
            void dispatch(
                authActions.signInIdentity({ token } as IdentityAuthTokenDto),
            );
        }
    }, [token, dispatch]);

    useEffect(() => {
        if (user) {
            dispatch(appActions.navigate(AppRoute.OVERVIEW));
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (dataStatus === DataStatus.REJECTED) {
            dispatch(appActions.navigate(AppRoute.SIGN_IN));
        }
    }, [dispatch, dataStatus]);

    return <Loader isOverflow />;
};

export { Identity };
