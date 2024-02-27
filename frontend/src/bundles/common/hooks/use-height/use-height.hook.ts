import { useCallback, useEffect, useState } from 'react';

const useHeight = (height: number): boolean => {
    const [isHeight, setIsHeight] = useState(false);

    const responsiveHighness = useCallback((): void => {
        if (window.innerHeight <= height) {
            setIsHeight(true);
        } else {
            setIsHeight(false);
        }
    }, [height]);

    useEffect(() => {
        window.addEventListener('resize', responsiveHighness);
        responsiveHighness();

        return () => window.removeEventListener('resize', responsiveHighness);
    }, [responsiveHighness]);

    return isHeight;
};

export { useHeight };
