import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/16/solid';
import { useCallback, useState } from 'react';

import { Button } from '~/bundles/common/components/components.js';
import { Icon } from '~/bundles/common/components/icon/icon.js';
import { type IconName } from '~/bundles/common/components/icon/types/types.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.css';

type Properties = {
    title: string;
    description: string;
    iconName: IconName;
};

const ConnectionOption = ({
    title,
    description,
    iconName,
}: Properties): JSX.Element => {
    const [isConnected, setIsConnected] = useState(false);

    const handleClick = useCallback((): undefined => {
        setIsConnected(!isConnected);
    }, [isConnected]);

    return (
        <div
            className={
                'bg-lm-black-100 flex flex-col gap-5 rounded-2xl p-6 md:p-10'
            }
        >
            <div className={'flex items-center justify-between gap-3'}>
                <Icon name={iconName} className={'w-10 sm:w-14 md:w-14'} />
                <div
                    className={getValidClassNames(
                        'flex w-full flex-col justify-between gap-4',
                        styles['option-header-right'],
                    )}
                >
                    <div className={'flex flex-col gap-1'}>
                        <div className={'flex items-center gap-2'}>
                            <h2
                                className={
                                    'text-sm font-bold text-white sm:text-base md:text-xl'
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
                                'text-lm-grey-200 text-[0.75rem] sm:text-sm md:text-base'
                            }
                        >
                            Link your{' '}
                            <span
                                className={`border-b border-b-${isConnected ? 'lm-yellow-100' : 'lm-red'}`}
                            >
                                {title}
                            </span>{' '}
                            account.
                        </p>
                    </div>
                    <Button
                        variant={isConnected ? 'secondary' : 'primary'}
                        size={'small'}
                        label={isConnected ? 'Disconnect' : 'Connect'}
                        className={
                            'h-6 max-w-[180px] sm:h-10 sm:max-w-40 md:max-w-60'
                        }
                        onClick={handleClick}
                    />
                </div>
            </div>
            <p
                className={getValidClassNames(
                    'text-lm-grey-100 text-sm',
                    styles['option-description'],
                )}
            >
                {description}
            </p>
        </div>
    );
};

export { ConnectionOption };
