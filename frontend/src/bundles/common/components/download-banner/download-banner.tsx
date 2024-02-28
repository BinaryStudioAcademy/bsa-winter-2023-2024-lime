import closeIcon from '~/assets/img/icons/close-icon.svg';
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

const DownloadBanner = (): JSX.Element => {
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

    return (
        <>
            {isBannerVisible && (
                <div className="bg-lm-yellow-200 fixed left-0 top-0 z-50 flex h-24 w-full items-center justify-evenly rounded-b-lg p-4 text-center text-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] lg:xl:hidden">
                    <button
                        onClick={closeBanner}
                        className="text-lm-black-300 ml-1 mr-3 h-12 w-12 hover:text-white"
                    >
                        <img src={closeIcon} alt="Close icon" />
                    </button>
                    <Icon
                        name={'logoIcon'}
                        color={IconColor.PRIMARY}
                        size={ComponentSize.EXTRA_LARGE}
                    />
                    <p className="text-bold mr-2">
                        Install LIME for a better experience!
                    </p>

                    <Button
                        size={ComponentSize.MEDIUM}
                        variant={ButtonVariant.PRIMARY}
                        label="Download App"
                        className="w-150"
                        onClick={handleInstall}
                    />
                </div>
            )}
        </>
    );
};

export { DownloadBanner };
