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
        <div
            className={
                'bg-lm-black-100 flex w-full  flex-col rounded-2xl p-4 md:p-6'
            }
        >
            <div
                className={
                    'border-lm-grey-200 mb-4 rounded-md border p-4 text-white md:border-2'
                }
            >
                <p
                    className={
                        'text-lm-yellow-100 text-3xl font-extrabold md:text-4xl'
                    }
                >
                    {name}
                </p>
                <span className={'text-lm-yellow-100 text-xl font-bold'}>
                    ${price}
                </span>{' '}
                / month
                <div className={'mt-2.5'}>
                    <p
                        className={
                            'text-lm-grey-100 text-xs sm:text-sm md:text-base'
                        }
                    >
                        {description}
                    </p>
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
