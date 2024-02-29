import {
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';

const useSidebarToggle = (): { isOpen: boolean; toggleSidebar: () => void } => {
    const [width, setWidth] = useState(window.innerWidth);
    const [isOpen, setIsOpen] = useState(width > 768);
    const toggleSidebar = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen, setIsOpen]);

    const handleResize = useCallback((): void => {
        setWidth(window.innerWidth);
        if (width > 768) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [width, setIsOpen]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize, width, setIsOpen]);

    return { isOpen, toggleSidebar };
};

export { useSidebarToggle };
