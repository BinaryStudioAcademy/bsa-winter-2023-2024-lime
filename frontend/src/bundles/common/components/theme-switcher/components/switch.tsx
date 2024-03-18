import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

import { useCallback } from '~/bundles/common/hooks/hooks.js';

type Properties = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    size?: number;
};

const Switch: React.FC<Properties> = ({
    checked,
    onChange,
    size = 24,
}): JSX.Element => {
    const handleChange = useCallback((): void => {
        onChange(!checked);
    }, [onChange, checked]);
    return (
        <button
            className="switch"
            style={{ width: size, height: size }}
            onClick={handleChange}
        >
            <span
                className="slider text-action flex items-center justify-center"
                style={{ width: size, height: size }}
            >
                {checked ? (
                    <MoonIcon className="h-8 w-8" />
                ) : (
                    <SunIcon className="h-8 w-8" />
                )}
            </span>
        </button>
    );
};

export { Switch };
