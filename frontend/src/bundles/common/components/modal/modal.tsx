import { type ReactNode } from 'react';

import iconClose from '~/assets/img/close.svg';

type Properties = {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    children?: ReactNode;
};

const Modal: React.FC<Properties> = ({ isOpen, title, onClose, children }) => {
    return (
        <div className={`modal flex justify-center items-center ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className='overlay fixed inset-0 bg-lm-black-400 opacity-15 z-50 cursor-pointer' onClick={onClose} role="presentation" />
            <div className='pt-16 px-32 pb-24 fixed flex justify-center items-start bg-lm-black-100 flex-col z-50 transition-all shadow-md rounded-34 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>

                <img src={iconClose} alt='Close modal' onClick={onClose} className='cursor-pointer absolute top-8 right-8' role="presentation" />

                <h3 className='text-lm-grey-200 font-extrabold text-xl leading-6 mb-10'>{title}</h3>

                {children}

            </div>
        </div>
    );
};

export { Modal };
