import { CheckCircleIcon } from '@heroicons/react/16/solid';

import { ComponentSize } from '../../enums/enums.js';
import { useCallback, useState } from '../../hooks/hooks.js';
import { Button, ButtonVariant } from '../components.js';

type Properties = {
    label: string;
    textToCopy: string;
    textToDisplay?: string;
    className?: string;
};

const CopyToClipboard: React.FC<Properties> = ({
    textToCopy,
    textToDisplay,
    label,
    className = '',
}): JSX.Element => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyToClipBoard = useCallback((): void => {
        if ('clipboard' in navigator) {
            navigator.clipboard
                .writeText(textToCopy)
                .then(() => {
                    setTimeout(() => {
                        setIsCopied(false);
                    }, 3000);

                    setIsCopied(true);
                })
                .catch((error) => {
                    throw error;
                });
        }
    }, [setIsCopied, textToCopy]);

    return (
        <div className={className}>
            <p className="text-primary mb-2 text-sm">{label}</p>
            <div className="flex items-center gap-2 sm:flex-wrap">
                <div className="bg-primary text-secondary flex h-9 items-center whitespace-nowrap rounded-lg p-4 text-sm">
                    <span>{textToDisplay ?? textToCopy}</span>
                </div>
                <div className="w-[8rem]">
                    <Button
                        label={isCopied ? 'Copied' : 'Copy'}
                        type="button"
                        variant={ButtonVariant.PRIMARY}
                        size={ComponentSize.SMALL}
                        leftIcon={
                            isCopied && <CheckCircleIcon className="w-5" />
                        }
                        onClick={handleCopyToClipBoard}
                        className="h-9"
                    />
                </div>
            </div>
        </div>
    );
};

export { CopyToClipboard };
