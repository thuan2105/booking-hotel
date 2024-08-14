import { format, parseISO } from 'date-fns';

const formatDate = (date) => {
    const dateObject = new Date(date);
    const isoDateString = dateObject.toISOString();
    const dateParse = parseISO(isoDateString);
    const formattedDate = format(dateParse, 'dd/MM/yyyy');
    return formattedDate;
};

export default formatDate;
