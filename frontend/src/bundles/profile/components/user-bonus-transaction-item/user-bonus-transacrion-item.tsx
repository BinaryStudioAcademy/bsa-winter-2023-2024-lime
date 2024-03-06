import { formatDate } from '~/bundles/common/helpers/helpers.js';

type Properties = {
    amount: number;
    actionMessage: string;
    date: string | null;
};

const UserBonusTransacrionItem = ({
    amount,
    actionMessage,
    date,
}: Properties): JSX.Element => {
    return (
        <div className="bg-lm-black-100 flex items-center justify-center gap-5 rounded-xl p-4">
            {amount > 0 ? (
                <p className="text-lm-yellow-100 text-sm lg:text-xl">
                    {' '}
                    +{amount}
                </p>
            ) : (
                <p className="text-lm-red text-sm lg:text-xl">{amount}</p>
            )}
            <p className="text-lm-grey-200 text-sm lg:text-base">
                {actionMessage}
            </p>
            <p className="text-lm-grey-200 text-sm lg:text-base">
                {formatDate(new Date(date ?? ''))}
            </p>
        </div>
    );
};

export { UserBonusTransacrionItem };
