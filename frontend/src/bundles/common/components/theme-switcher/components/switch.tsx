import { useCallback } from 'react';

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
    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            onChange(event.target.checked);
        },
        [onChange],
    );

    return (
        <div className="switch" style={{ width: size, height: size }}>
            <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
                id="switchTheme"
            />
            <span
                className="slider"
                style={{ width: size, height: size }}
            ></span>
        </div>
    );
};

export { Switch };
