import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Button,
    ButtonSize,
    ButtonVariant,
} from '../../components/components.js';
import {
    NotFoundIcon,
    NotFoundIconColor,
    NotFoundIconSize,
} from '../../components/icons/icons.js';
import { AppRoute } from '../../enums/app-route.enum.js';

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
                <h1 className=" mt-5 text-4xl text-white">
                    Oops, this page not found
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
