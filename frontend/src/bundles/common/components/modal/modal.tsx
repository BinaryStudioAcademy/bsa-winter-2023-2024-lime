import { XMarkIcon } from '@heroicons/react/16/solid';

import { useMemo } from '~/bundles/common/hooks/hooks.js';
import { type ReactNode, type ValueOf } from '~/bundles/common/types/types.js';

import { ComponentSize } from '../../enums/enums.js';
import { getValidClassNames } from '../../helpers/helpers.js';

type ModalSize = Exclude<
    ValueOf<typeof ComponentSize>,
    | typeof ComponentSize.SMALL
    | typeof ComponentSize.EXTRA_LARGE
    | typeof ComponentSize.HUGE
>;

type Properties = {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    children?: ReactNode;
    size?: ModalSize;
};

const Modal: React.FC<Properties> = ({
    isOpen,
    title,
    onClose,
    children,
    size = ComponentSize.MEDIUM,
}) => {
    const onBackdropClick = useMemo(
        () => (event: React.MouseEvent<HTMLDivElement>) => {
            if (event.target === event.currentTarget) {
                onClose();
            }
        },
        [onClose],
    );

    const classes = {
        overlayClass: getValidClassNames(
            'overlay bg-overlay fixed inset-0 z-50',
            isOpen ? 'opacity-1' : 'opacity-0 pointer-events-none',
        ),
        contentClass:
            'mx-auto max-h-[95%] bg-secondary rounded-34 fixed left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2  flex-col items-start justify-center px-8 md:px-32 pb-24 pt-16 shadow-md transition-all',
        closeIconClass:
            'stroke-lm-grey-500 fill-lm-grey-500 hover:stroke-lm-yellow-100 hover:fill-lm-yellow-100 absolute right-8 top-8 h-3 w-3 cursor-pointer transition-all ',
        titleClass:
            'mb-10 text-left text-md md:text-[1.875rem] font-bold text-card',
    };

    const modalSizesToClasses: Record<ModalSize, string> = {
        [ComponentSize.MEDIUM]: 'w-[21rem] md:w-[39.375rem]',
        [ComponentSize.LARGE]: 'w-[21rem] md:w-[45.625rem]',
    };

    return (
        <div
            className={getValidClassNames(classes.overlayClass)}
            onClick={onBackdropClick}
            role="presentation"
        >
            <div
                className={getValidClassNames(
                    classes.contentClass,
                    modalSizesToClasses[size],
                )}
            >
                <XMarkIcon
                    onClick={onClose}
                    className={getValidClassNames(classes.closeIconClass)}
                />

                <div className="w-full overflow-y-auto">
                    <h3 className={getValidClassNames(classes.titleClass)}>
                        {title}
                    </h3>

                    {children}
                </div>
            </div>
        </div>
    );
};

export { Modal };
