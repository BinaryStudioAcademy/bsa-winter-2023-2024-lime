import { useCallback } from 'react';

import { Button } from '~/bundles/common/components/components.js';

import { type SubscribeRequestDto } from '../../types/types.js';

type Properties = {
    id: number;
    name: string;
    description: string;
    price: number;
    priceToken: string;
    handleClick: ({ planId, priceToken }: SubscribeRequestDto) => void;
};

const SubscriptionPlan = ({
    id,
    name,
    description,
    price,
    priceToken,
    handleClick,
}: Properties): JSX.Element => {
    const handleSubscribeButtonClick = useCallback(() => {
        handleClick({ planId: id, priceToken });
    }, [id, priceToken, handleClick]);

    return (
        <div className="bg-lm-black-100 flex w-full max-w-[30rem] flex-col rounded-2xl p-4 md:max-w-full md:p-6">
            <div className="border-lm-grey-200 mb-4 flex w-full justify-between rounded-md border p-4 md:border-2">
                <div className=" flex flex-col text-white">
                    <p className="text-lm-yellow-100 text-3xl">
                        {name.toUpperCase()}
                    </p>
                    <p>
                        <span className="text-lm-yellow-100 text-xl">
                            ${price}
                        </span>
                        / month
                    </p>
                    <div className="mt-2.5">
                        <p className="text-lm-grey-100 text-xs sm:text-sm md:text-base">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
            <Button
                type="button"
                label="Subscribe"
                variant="primary"
                size="md"
                onClick={handleSubscribeButtonClick}
            />
        </div>
    );
};

export { SubscriptionPlan };
