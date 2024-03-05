import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/16/solid';

import { Button } from '~/bundles/common/components/components.js';
import { type IconName } from '~/bundles/common/components/icon/enums/enums.js';
import { Icon } from '~/bundles/common/components/icon/icon.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type OAuthProvider } from '~/bundles/profile/pages/connections-page/enums/enums.js';

import { actions } from '../store/connections.js';

type Properties = {
    title: string;
    description: string;
    iconName: ValueOf<typeof IconName>;
    provider: ValueOf<typeof OAuthProvider>;
};

const ConnectionOption = ({
    title,
    description,
    iconName,
    provider,
}: Properties): JSX.Element => {
    const dispatch = useAppDispatch();

    const { connections } = useAppSelector(({ connections }) => ({
        connections: connections.connections,
    }));

    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const providerIsConnected = connections.find(
            (connection) => connection.provider === provider,
        );

        setIsConnected(!!providerIsConnected);
    }, [connections, provider]);

    const handleClick = useCallback((): void => {
        const providerIsConnected = connections.find(
            (connection) => connection.provider === provider,
        );

        providerIsConnected
            ? void dispatch(actions.deauthorize(provider))
            : void dispatch(actions.authorize(provider));
    }, [connections, dispatch, provider]);

    return (
        <div className={'bg-lm-black-100 flex flex-col gap-5 rounded-2xl p-6'}>
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
