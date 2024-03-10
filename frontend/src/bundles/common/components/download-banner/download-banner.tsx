import { XMarkIcon } from '@heroicons/react/24/solid';

import { ComponentSize } from '~/bundles/common/enums/enums.js';
import {
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import { Button, ButtonVariant, Icon } from '../components.js';
import { IconColor } from '../icon/enums/icon-colors.enum.js';

interface ExtendedNavigator extends Navigator {
    standalone?: boolean;
}
interface BeforeInstallPromptEvent extends Event {
    prompt(): void;
    userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
    }>;
}
const isAppInstalled = (): boolean => {
    const extendedNavigator = window.navigator as ExtendedNavigator;

    return (
        extendedNavigator.standalone ||
        window.matchMedia('(display-mode: standalone)').matches
    );
};

const DownloadBanner = (): JSX.Element | null => {
    const [isBannerVisible, setBannerVisibility] = useState(true);
    const [deferredPrompt, setDeferredPrompt] =
        useState<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        const beforeInstallPromptHandler = (event: Event): void => {
            if (event.type === 'beforeinstallprompt') {
                const beforeInstallPromptEvent =
                    event as BeforeInstallPromptEvent;
                beforeInstallPromptEvent.preventDefault();
                setDeferredPrompt(beforeInstallPromptEvent);
                setBannerVisibility(true);
            }
        };

        window.addEventListener(
            'beforeinstallprompt',
            beforeInstallPromptHandler,
        );

        return () => {
            window.removeEventListener(
                'beforeinstallprompt',
                beforeInstallPromptHandler,
            );
        };
    }, []);

    const handleInstall = useCallback((): void => {
        if (deferredPrompt && !isAppInstalled()) {
            void deferredPrompt.prompt();
            deferredPrompt.userChoice
                .then((choice) => {
                    if (choice.outcome === 'accepted') {
                        setBannerVisibility(false);
                    }
                })
                .catch(() => {});
        }
    }, [deferredPrompt]);

    const closeBanner = useCallback((): void => {
        void setBannerVisibility(false);
    }, []);

    useEffect(() => {
        if (isAppInstalled()) {
            setBannerVisibility(false);
        }
    }, []);

    if (!isBannerVisible || !deferredPrompt) {
        return null;
    }
    return (
        <div className="bg-buttonSecondary fixed left-0 top-0 z-50 flex h-24 w-full items-center justify-evenly rounded-b-lg p-4 text-center text-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] lg:xl:hidden">
            <button
                onClick={closeBanner}
                className="text-lm-black-300 hover:text-primary ml-1 mr-3 h-12 w-12"
            >
                <XMarkIcon className="mx-1 h-6 w-6" />
            </button>
            <Icon
                name={'logoIcon'}
                color={IconColor.PRIMARY}
                size={ComponentSize.EXTRA_LARGE}
                className="sm:h-16 sm:w-16 md:h-20 md:w-20"
            />
            <p className="text-primary text-bold md:text-normal mr-2 md:text-2xl">
                Install LIME for a better experience!
            </p>
            <div className="w-[16rem]">
                <Button
                    size={ComponentSize.MEDIUM}
                    variant={ButtonVariant.PRIMARY}
                    label="Download App"
                    onClick={handleInstall}
                />
            </div>
        </div>
    );
};

export { DownloadBanner };
