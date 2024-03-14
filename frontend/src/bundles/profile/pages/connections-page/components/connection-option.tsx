import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/16/solid';

import { Button } from '~/bundles/common/components/components.js';
import { Icon } from '~/bundles/common/components/icon/icon.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { OAuthProvider } from '~/bundles/profile/pages/connections-page/enums/enums.js';
import { actions } from '~/bundles/profile/pages/connections-page/store/connections.js';
import { type ConnectionOption as TConnectionOption } from '~/bundles/profile/pages/connections-page/types/types.js';

const ConnectionOption = ({
    title,
    description,
    logoIcon,
    provider,
    buttonIcon,
}: TConnectionOption): JSX.Element => {
    const dispatch = useAppDispatch();

    const { connections } = useAppSelector(({ connections }) => ({
        dataStatus: connections.dataStatus,
        connections: connections.connections,
    }));

    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const existingConnection = connections.find(
            (connection) => connection.provider === provider,
        );

        setIsConnected(Boolean(existingConnection));
    }, [connections, provider]);

    const handleClick = useCallback((): void => {
        const existingConnection = connections.find(
            (connection) => connection.provider === provider,
        );

        existingConnection
            ? void dispatch(actions.deauthorize(provider))
            : void dispatch(actions.authorize(provider));
    }, [connections, dispatch, provider]);

    const providerBrandToStyles: Record<
        ValueOf<typeof OAuthProvider>,
        string
    > = {
        [OAuthProvider.STRAVA]: 'bg-strava-brand hover:bg-strava-brand',
        [OAuthProvider.GOOGLE_FIT]: '',
    };

    return (
        <div className={'bg-primary flex flex-col gap-5 rounded-2xl p-6'}>
            <div
                className={
                    'flex flex-col items-start justify-between gap-5 xl:flex-row xl:items-center'
                }
            >
                <div className={'flex w-full gap-4'}>
                    <Icon name={logoIcon} className={'w-10 sm:w-14 md:w-14'} />
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
                                    className={'text-action w-4 md:w-5'}
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

                <div className="flex w-full justify-end">
                    {buttonIcon ? (
                        <Button
                            variant={'primary'}
                            size={'md'}
                            leftIcon={
                                !isConnected && <Icon name={buttonIcon} />
                            }
                            label={isConnected ? 'Disconnect' : ''}
                            className={getValidClassNames(
                                'w-full max-w-full text-white sm:h-12 xl:w-[15rem]',
                                providerBrandToStyles[provider],
                            )}
                            onClick={handleClick}
                        />
                    ) : (
                        <Button
                            variant={isConnected ? 'secondary' : 'primary'}
                            size={'md'}
                            label={isConnected ? 'Disconnect' : 'Connect'}
                            className={'w-full max-w-full sm:h-12 xl:w-[15rem]'}
                            onClick={handleClick}
                        />
                    )}
                </div>
            </div>
            <p className="text-lm-grey-100 text-sm xl:text-base">
                {description}
            </p>
        </div>
    );
};

export { ConnectionOption };
