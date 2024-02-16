import { type MouseEvent as ReactMouseEvent, type RefObject } from 'react';

import { useLayoutEffect } from '../hooks.js';

type Properties = {
    ref: RefObject<HTMLElement>;
    onClick: () => void;
};

const useHandleClickOutside = ({ ref, onClick }: Properties): void => {
    useLayoutEffect(() => {
        const handleClickOutside = (
            event: ReactMouseEvent | MouseEvent,
        ): void => {
            const isInnerClick = ref.current?.contains(event.target as Node);
            const isCurrentElement = event.target === ref.current;

            if (!isInnerClick && !isCurrentElement) {
                onClick();
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [ref, onClick]);
};

export { useHandleClickOutside };
