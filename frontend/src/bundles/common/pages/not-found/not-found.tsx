import {
    Button,
    ButtonVariant,
    Icon,
} from '~/bundles/common/components/components.js';
import { IconColor } from '~/bundles/common/components/icon/enums/enums.js';
import { AppRoute, ComponentSize } from '~/bundles/common/enums/enums.js';
import { useCallback, useNavigate } from '~/bundles/common/hooks/hooks.js';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    const redirectToHomepage = useCallback((): void => {
        navigate(AppRoute.ROOT);
    }, [navigate]);

    return (
        <div className="bg-secondary flex flex-1 items-center justify-center pl-3 pr-3">
            <div className="text-center">
                <Icon
                    color={IconColor.PRIMARY}
                    size={ComponentSize.EXTRA_LARGE}
                    name="notFoundIcon"
                    className="ml-auto mr-auto block"
                />
                <h1 className="text-primary mt-5 text-4xl">
                    Oops, this page was not found
                </h1>
                <Button
                    label="Go to homepage"
                    size={ComponentSize.MEDIUM}
                    variant={ButtonVariant.PRIMARY}
                    className="mt-5 w-40"
                    onClick={redirectToHomepage}
                />
            </div>
        </div>
    );
};

export { NotFound };
