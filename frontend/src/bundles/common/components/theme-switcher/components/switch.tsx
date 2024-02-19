import { useCallback } from 'react';

import { Icon } from '../../components.js';
import { IconColor } from '../../icon/enums/icon-colors.enum.js';
import { IconSize } from '../../icon/enums/icon-size.enum.js';

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
        (): void => {
            onChange(!checked);
        },
        [onChange, checked],
    );        
    return (
        <button className="switch" style={{ width: size, height: size }} onClick={handleChange}>           
             <span
                className="slider"
                style={{ width: size, height: size }}
            >
                <Icon
                    name={checked ? 'sunIcon' : 'moonIcon'}                    
                    size={IconSize.LARGE}
                    color={IconColor.PRIMARY}
                />
            </span>
        </button>
    );
};

export { Switch };
