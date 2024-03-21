import { DateObject } from 'react-multi-date-picker';

import { DateFormat } from '~/bundles/common/enums/enums.js';

const formatDateString = (
    date: Date,
    format: string = DateFormat.FULL_DAY_DATE_TIME,
): string => {
    const convertedDate = new DateObject(date);

    return convertedDate.format(format);
};

export { formatDateString };
