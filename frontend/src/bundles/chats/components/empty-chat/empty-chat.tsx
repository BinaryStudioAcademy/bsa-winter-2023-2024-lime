import { Link } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';

const EmptyChat = (): JSX.Element => {
    return (
        <div className="flex items-center justify-center">
            <p className="text-secondary">
                Choose the chat or{' '}
                {/* This link must be replaced by link with friends page*/}
                <Link className="text-action" to={AppRoute.CHATS}>
                    create new one.
                </Link>
            </p>
        </div>
    );
};

export { EmptyChat };
