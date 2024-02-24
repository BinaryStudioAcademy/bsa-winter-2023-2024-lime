import moment from 'moment';

const dateConverter = (date: string): string => {
    const convertedDate = new Date(date);
    return moment(convertedDate).format('dddd, MMMM | h:mm A');
};

export { dateConverter };
