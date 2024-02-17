import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useCallback, useRef, useState } from '~/bundles/common/hooks/hooks.js';

import { EventKey } from '../../enums/enums.js';
import { useHandleClickOutside } from '../../hooks/use-handle-click-outside/use-handle-click-outside.hook.js';

type Properties = {
    content: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    classNameContentWrapper?: string;
};

const Popover = ({
    className,
    classNameContentWrapper,
    content,
    children,
}: Properties): JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const popupReference = useRef<HTMLDivElement>(null);

    const handleClick = useCallback((): void => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    const handleClose = (): void => {
        setIsOpen(false);
    };

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>): void => {
            if (event.key === EventKey.ESCAPE) {
                handleClose();
            }
        },
        [],
    );

    useHandleClickOutside({
        ref: popupReference,
        onClick: handleClose,
    });

    return (
        <div
            className={getValidClassNames(
                'relative flex w-full items-center',
                className,
            )}
            role="button"
            tabIndex={0}
            ref={popupReference}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            {children}
            {isOpen && (
                <div
                    className={getValidClassNames(
                        'absolute top-16 z-50 flex flex-col rounded-lg',
                        classNameContentWrapper,
                    )}
                >
                    {content}
                </div>
            )}
        </div>
    );
};

export { Popover };
