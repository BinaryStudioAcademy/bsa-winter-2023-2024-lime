import { DateObject } from 'react-multi-date-picker';

import { DateFormat } from '~/bundles/common/enums/enums.js';

const formatDate = (date: string): string => {
    const convertedDate = new DateObject(date);

    return convertedDate.format(DateFormat.FULL_DAY);
};

export { formatDate };
