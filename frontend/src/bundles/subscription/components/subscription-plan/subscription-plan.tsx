import { Button } from '~/bundles/common/components/components.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';

import {
    type SubscribeBonusRequestDto,
    type SubscribeRequestDto,
} from '../../types/types.js';

type Properties = {
    id: number;
    name: string;
    description: string;
    price: number;
    bonusPrice: number;
    stripePriceId: string;
    onSubscribe: ({ planId, stripePriceId }: SubscribeRequestDto) => void;
    onBuyWithPoints: ({
        planId,
        stripePriceId,
        bonusPrice,
    }: SubscribeBonusRequestDto) => void;
};

const SubscriptionPlan: React.FC<Properties> = ({
    id,
    name,
    description,
    price,
    bonusPrice,
    stripePriceId,
    onSubscribe,
    onBuyWithPoints,
}): JSX.Element => {
    const handleSubscribeButtonClick = useCallback(() => {
        onSubscribe({ planId: id, stripePriceId });
    }, [id, stripePriceId, onSubscribe]);

    const handleBuyWithPoints = useCallback(() => {
        onBuyWithPoints({
            planId: id,
            stripePriceId,
            bonusPrice,
        });
    }, [id, stripePriceId, onBuyWithPoints, bonusPrice]);

    return (
        <div className="bg-primary flex w-full max-w-[30rem] flex-col rounded-2xl p-4 md:max-w-full md:p-6">
            <div className="border-lm-grey-200 mb-4 flex w-full justify-between rounded-md border p-4 md:border-2">
                <div className=" text-primary flex flex-col">
                    <p className="text-action text-3xl">{name.toUpperCase()}</p>
                    <p className="text-primary">
                        <span className="text-action text-xl">${price}</span>
                        <span> or </span>
                        <span className="text-action text-xl">
                            {bonusPrice || ''}
                        </span>{' '}
                        points / month
                    </p>
                    <div className="mt-2.5">
                        <p className="text-lm-grey-100 text-xs sm:text-sm md:text-base">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex gap-5">
                <Button
                    type="button"
                    label="Subscribe"
                    variant="primary"
                    size="md"
                    onClick={handleSubscribeButtonClick}
                />
                <Button
                    type="button"
                    label="Buy with points"
                    variant="secondary"
                    size="md"
                    onClick={handleBuyWithPoints}
                />
            </div>
        </div>
    );
};

export { SubscriptionPlan };
