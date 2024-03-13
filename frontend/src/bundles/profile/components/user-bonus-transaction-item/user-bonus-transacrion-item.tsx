import { UserBonusTransactionType } from 'shared';

import { formatDate } from '~/bundles/common/helpers/helpers.js';

type Properties = {
    amount: number;
    actionMessage: string;
    transactionType: string;
    date: string | null;
};

const UserBonusTransacrionItem = ({
    amount,
    actionMessage,
    transactionType,
    date,
}: Properties): JSX.Element => {
    return (
        <div className="bg-primary flex items-center justify-center gap-5 rounded-xl p-4">
            {transactionType === UserBonusTransactionType.INCOME ? (
                <p className="text-action text-sm lg:text-xl"> +{amount}</p>
            ) : (
                <p className="text-lm-red text-sm lg:text-xl">{amount}</p>
            )}
            <p className="text-secondary text-sm lg:text-base">
                {actionMessage}
            </p>
            <p className="text-secondary text-sm lg:text-base">
                {formatDate(new Date(date ?? ''))}
            </p>
        </div>
    );
};

export { UserBonusTransacrionItem };
