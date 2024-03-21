import { formatDateString } from '~/bundles/common/helpers/helpers.js';

const getCompletedDate = (date: string | null): string => {
    return date ? 'Completed at: ' + formatDateString(new Date(date)) : '';
};

export { getCompletedDate };
