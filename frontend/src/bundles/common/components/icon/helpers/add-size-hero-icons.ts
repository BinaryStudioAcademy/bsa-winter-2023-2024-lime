import React from 'react';

import { type ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { sizeToClass } from './helpers.js';

interface Properties {
    icon: JSX.Element;
    size: ValueOf<typeof ComponentSize>;
}

const addSizePropertyHeroIcons = ({ icon, size }: Properties): JSX.Element => {
    return React.cloneElement(icon, {
        className: `${icon.props.className} ${sizeToClass[size]}`,
    });
};

export { addSizePropertyHeroIcons };
