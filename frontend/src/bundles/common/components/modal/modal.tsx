import { XMarkIcon } from '@heroicons/react/16/solid';
import { type ReactNode } from 'react';

type Properties = {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    children?: ReactNode;
};

const Modal: React.FC<Properties> = ({ isOpen, title, onClose, children }) => {
    return (
        <div
            className={`modal flex items-center justify-center ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
        >
            <div
                className="overlay bg-lm-black-400 fixed inset-0 z-50 cursor-pointer opacity-15"
                onClick={onClose}
                role="presentation"
            />
            <div className="bg-lm-black-100 rounded-34 fixed fixed left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-start justify-center px-32 pb-24 pt-16 shadow-md transition-all ">
                <XMarkIcon
                    onClick={onClose}
                    className="stroke-lm-grey-500 fill-lm-grey-500 hover:stroke-lm-yellow-100 hover:fill-lm-yellow-100 absolute right-8 top-8 h-3 w-3 cursor-pointer transition-all "
                />

                <h3 className="text-lm-grey-200 mb-10 text-xl font-extrabold leading-6">
                    {title}
                </h3>

                {children}
            </div>
        </div>
    );
};

export { Modal };
