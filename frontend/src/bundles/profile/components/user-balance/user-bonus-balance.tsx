import { type UserBonusGetAllItemResponseDto } from 'shared';

import {
    Button,
    ButtonVariant,
    Icon,
    Loader,
    Modal,
} from '~/bundles/common/components/components.js';
import { IconName } from '~/bundles/common/components/icon/enums/enums.js';
import { ComponentSize, DataStatus } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type UserBonusActionStatus } from '../../enums/enums.js';
import { UserBonusTransactionMessage } from '../../enums/enums.js';
import { UserBonusTransacrionItem } from '../user-bonus-transaction-item/user-bonus-transacrion-item.js';

type Properties = {
    userBonusesTransactions: UserBonusGetAllItemResponseDto[];
    userBonusesStatus: ValueOf<typeof DataStatus>;
    bonusBalance: number;
    className?: string;
    onShowTransactions: () => void;
};

const UserBonusBalance = ({
    userBonusesTransactions,
    userBonusesStatus,
    bonusBalance,
    className,
    onShowTransactions,
}: Properties): JSX.Element => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = useCallback((): void => {
        void setIsModalOpen(false);
    }, []);

    const handleShowTransactions = useCallback((): void => {
        onShowTransactions();
        setIsModalOpen(true);
    }, [onShowTransactions]);

    return (
        <div className="flex flex-col">
            <div
                className={getValidClassNames(
                    className,
                    ' bg-secondary flex flex-col justify-center gap-2 rounded-xl p-4',
                )}
            >
                <div className="flex w-full items-center justify-start gap-2">
                    <span className="text-secondary text-xl">
                        Your balance:
                    </span>
                    <span className="text-lm-yellow-200 text-xl font-bold">
                        {bonusBalance}
                    </span>
                    <Icon
                        name={IconName.limeCoinIcon}
                        size={ComponentSize.MEDIUM}
                        className="text-lm-yellow-200"
                    />
                </div>
                <Button
                    label={'Show history of transactions'}
                    variant={ButtonVariant.PRIMARY}
                    size={ComponentSize.SMALL}
                    onClick={handleShowTransactions}
                />
            </div>
            <Modal
                isOpen={isModalOpen}
                title="Transactions"
                onClose={handleCloseModal}
            >
                {userBonusesStatus === DataStatus.PENDING ? (
                    <div className="flex items-center justify-center">
                        <Loader />
                    </div>
                ) : (
                    <div className="flex h-full max-h-[25rem] flex-col gap-3 overflow-y-auto pr-2">
                        {userBonusesTransactions.map((bonus) => (
                            <UserBonusTransacrionItem
                                key={bonus.id}
                                amount={bonus.amount}
                                actionMessage={
                                    UserBonusTransactionMessage[
                                    bonus.actionType as ValueOf<
                                        typeof UserBonusActionStatus
                                    >
                                    ]
                                }
                                date={bonus.createdAt}
                            />
                        ))}

                    </div>
                )}
            </Modal>
        </div>
    );
};

export { UserBonusBalance };
