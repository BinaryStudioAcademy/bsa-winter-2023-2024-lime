interface Properties {
    days: number;
}

const getTimestampNDaysAgo = ({ days }: Properties): number => {
    return Date.now() - days * 24 * 60 * 60 * 1000;
};

export { getTimestampNDaysAgo };
