import {
    Button,
    ButtonSize,
    ButtonVariant,
} from '~/bundles/common/components/components.js';
import {
    NotFoundIcon,
    NotFoundIconColor,
    NotFoundIconSize,
} from '~/bundles/common/components/icons/icons.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useCallback, useNavigate } from '~/bundles/common/hooks/hooks.js';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    const redirectToHomepage = useCallback((): void => {
        navigate(AppRoute.ROOT);
    }, [navigate]);

    return (
        <div className="bg-lm-black-200 flex flex-1 items-center justify-center pl-3 pr-3">
            <div className="text-center">
                <NotFoundIcon
                    color={NotFoundIconColor.PRIMARY}
                    size={NotFoundIconSize.EXTRA_LARGE}
                />
                <h1 className="mt-5 text-4xl text-white">
                    Oops, this page was not found
                </h1>
                <Button
                    label="Go to homepage"
                    size={ButtonSize.MEDIUM}
                    variant={ButtonVariant.PRIMARY}
                    className="mt-5 w-40"
                    onClick={redirectToHomepage}
                />
            </div>
        </div>
    );
};

export { NotFound };
