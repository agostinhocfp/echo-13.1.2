import { parseISO, format, formatDistance } from "date-fns";

const DateFormatterDF = (dateString) => {
  const date = parseISO(dateString);
  // return format(date, "LLLL	d, yyyy");
  return formatDistance(date, new Date(), { addSuffix: true });
};

export default DateFormatterDF;
