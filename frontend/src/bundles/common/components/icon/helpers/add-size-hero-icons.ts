import React from 'react';

import { type ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { sizeToClass } from './helpers.js';

type Properties = {
    icon: JSX.Element;
    size: ValueOf<typeof ComponentSize>;
};

const addSizePropertyHeroIcons: React.FC<Properties> = ({
    icon,
    size,
}): JSX.Element => {
    return React.cloneElement(icon, {
        className: `${icon.props.className} ${sizeToClass[size]}`,
    });
};

export { addSizePropertyHeroIcons };
