const formatToDateFromUnix = (unixDate: number): Date => {
    return new Date(unixDate * 1000);
};

export { formatToDateFromUnix };
