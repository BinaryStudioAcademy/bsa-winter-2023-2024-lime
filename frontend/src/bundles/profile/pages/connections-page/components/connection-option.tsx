import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/16/solid';
import { useCallback, useState } from 'react';

import { Button } from '~/bundles/common/components/components.js';
import { type IconName } from '~/bundles/common/components/icon/enums/enums.js';
import { Icon } from '~/bundles/common/components/icon/icon.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type Properties = {
    title: string;
    description: string;
    iconName: ValueOf<typeof IconName>;
};

const ConnectionOption = ({
    title,
    description,
    iconName,
}: Properties): JSX.Element => {
    const [isConnected, setIsConnected] = useState(false);

    const handleClick = useCallback((): void => {
        setIsConnected(!isConnected);
    }, [isConnected]);

    return (
        <div className={'bg-primary flex flex-col gap-5 rounded-2xl p-6'}>
            <div
                className={
                    'flex flex-col items-start justify-between gap-5 xl:flex-row xl:items-center'
                }
            >
                <div className={'flex w-full gap-4'}>
                    <Icon name={iconName} className={'w-10 sm:w-14 md:w-14'} />
                    <div className={'flex flex-col gap-1'}>
                        <div className={'flex items-center gap-2'}>
                            <h2
                                className={
                                    'text-primary text-sm font-bold sm:text-base md:text-xl'
                                }
                            >
                                {title}
                            </h2>
                            {isConnected ? (
                                <CheckCircleIcon
                                    className={'text-lm-yellow-100 w-4 md:w-5'}
                                />
                            ) : (
                                <XCircleIcon
                                    className={'text-lm-red w-4 md:w-5'}
                                />
                            )}
                        </div>
                        <p
                            className={
                                'text-secondary text-[0.75rem] sm:text-sm md:text-base'
                            }
                        >
                            {isConnected ? (
                                <span>
                                    Your{' '}
                                    <span
                                        className={
                                            'border-b-lm-yellow-100 border-b'
                                        }
                                    >
                                        {title}
                                    </span>{' '}
                                    account has been successfully linked.
                                </span>
                            ) : (
                                <span>
                                    Link your{' '}
                                    <span
                                        className={'border-b-lm-red border-b'}
                                    >
                                        {title}
                                    </span>{' '}
                                    account.
                                </span>
                            )}
                        </p>
                    </div>
                </div>
                <Button
                    variant={isConnected ? 'secondary' : 'primary'}
                    size={'md'}
                    label={isConnected ? 'Disconnect' : 'Connect'}
                    className={'w-full max-w-full sm:h-10 xl:w-[15rem]'}
                    onClick={handleClick}
                />
            </div>
            <p className="text-lm-grey-100 text-sm xl:text-base">
                {description}
            </p>
        </div>
    );
};

export { ConnectionOption };
