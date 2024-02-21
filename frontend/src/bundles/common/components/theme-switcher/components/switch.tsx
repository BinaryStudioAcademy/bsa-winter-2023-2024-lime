import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

import { useCallback } from '~/bundles/common/hooks/hooks.js';

type SwitchProperties = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    size?: number;
};

const Switch = ({
    checked,
    onChange,
    size = 24,
}: SwitchProperties): JSX.Element => {
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
                className="slider text-lm-yellow-100"
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
