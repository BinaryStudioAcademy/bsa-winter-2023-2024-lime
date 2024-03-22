import {
    useCallback,
    useEffect,
    useParams,
    useState,
} from '~/bundles/common/hooks/hooks.js';

const RESPONSIVE_WIDTH = 1024;

const useSidebarToggle = (): { isOpen: boolean; toggleSidebar: () => void } => {
    const [width, setWidth] = useState(window.innerWidth);
    const [isOpen, setIsOpen] = useState(width > RESPONSIVE_WIDTH);
    const parameters = useParams();

    useEffect(() => {
        setIsOpen(width > RESPONSIVE_WIDTH);
    }, [parameters, width]);
    const toggleSidebar = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen, setIsOpen]);

    const handleResize = useCallback((): void => {
        setWidth(window.innerWidth);
        if (width > RESPONSIVE_WIDTH) {
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
