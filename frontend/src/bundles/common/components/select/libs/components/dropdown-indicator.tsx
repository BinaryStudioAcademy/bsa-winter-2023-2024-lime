import { components } from 'react-select';

import arrowDown from '~/assets/img/icons/arrow-down-icon.svg';

const DropdownIndicator: typeof components.DropdownIndicator = (properties) => {
    return (
        <components.DropdownIndicator {...properties}>
            <img src={arrowDown} alt="arrow-down" />
        </components.DropdownIndicator>
    );
};

export { DropdownIndicator };
