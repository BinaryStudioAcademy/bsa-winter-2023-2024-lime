import { useEffect, useState } from 'react';

const BREAKPOINT = {
    MEDIUM: 680,
} as const;

const useHeight = (): boolean => {
    const [isHeight, setIsHeight] = useState(false);

    const responsiveHighness = (): void => {
        if (window.innerHeight <= BREAKPOINT.MEDIUM) {
            setIsHeight(true);
        } else {
            setIsHeight(false);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', responsiveHighness);
        responsiveHighness();
    }, [isHeight]);

    return isHeight;
};

export { useHeight };
