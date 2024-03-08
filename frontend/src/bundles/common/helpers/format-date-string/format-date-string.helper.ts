import { DateObject } from 'react-multi-date-picker';

import { DateFormat } from '~/bundles/common/enums/enums.js';

const formatDateString = (date: Date): string => {
    const convertedDate = new DateObject(date);

    return convertedDate.format(DateFormat.FULL_DAY_DATE_TIME);
};

export { formatDateString };
