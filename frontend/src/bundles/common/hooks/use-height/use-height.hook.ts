import { useCallback, useEffect, useState } from 'react';

const useHeight = (height: number): boolean => {
    const [isHeight, setIsHeight] = useState(false);

    const handleResize = useCallback((): void => {
        if (window.innerHeight <= height) {
            setIsHeight(true);
        } else {
            setIsHeight(false);
        }
    }, [height]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    return isHeight;
};

export { useHeight };
