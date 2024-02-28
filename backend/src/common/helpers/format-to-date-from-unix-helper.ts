import { UNIX_TIMESTAMP_MULTIPLIER } from '../constants/constants.js';

const formatToDateFromUnix = (unixDate: number): Date => {
    return new Date(unixDate * UNIX_TIMESTAMP_MULTIPLIER);
};

export { formatToDateFromUnix };
