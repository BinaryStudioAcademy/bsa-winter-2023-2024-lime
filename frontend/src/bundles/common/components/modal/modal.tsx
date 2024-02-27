import { XMarkIcon } from '@heroicons/react/16/solid';
import { type ReactNode } from 'react';

import { getValidClassNames } from '../../helpers/helpers.js';

type Properties = {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    children?: ReactNode;
};

const Modal: React.FC<Properties> = ({ isOpen, title, onClose, children }) => {
    const classes = {
        modalClass: `modal flex items-center justify-center ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`,
        overlayClass:
            'overlay bg-lm-black-400 fixed inset-0 z-50 cursor-pointer opacity-15',
        contentClass:
            'bg-primary rounded-34 fixed left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-start justify-center px-32 pb-24 pt-16 shadow-md transition-all',
        closeIconClass:
            'stroke-lm-grey-500 fill-lm-grey-500 hover:stroke-lm-yellow-100 hover:fill-lm-yellow-100 absolute right-8 top-8 h-3 w-3 cursor-pointer transition-all ',
        titleClass: 'mb-10 text-left text-[1.875rem] font-bold text-white',
    };
    return (
        <div className={getValidClassNames(classes.modalClass)}>
            <div
                className={getValidClassNames(classes.overlayClass)}
                onClick={onClose}
                role="presentation"
            />
            <div className={getValidClassNames(classes.contentClass)}>
                <XMarkIcon
                    onClick={onClose}
                    className={getValidClassNames(classes.closeIconClass)}
                />

                <div className="max-w-xs">
                    <h3 className="mb-10 text-left text-[1.875rem] font-bold text-white">
                        {title}
                    </h3>

                    {children}
                </div>
            </div>
        </div>
    );
};

export { Modal };
