import { DateTime, Interval } from 'luxon';

export const monthInterval = ({ month, year }) => {
  const monthStart = DateTime.fromObject({ month, year });
  const monthEnd = DateTime.fromObject({
    day: monthStart.daysInMonth,
    month,
    year
  });
  return Interval.fromDateTimes(monthStart, monthEnd);
};

// export const endOfMonth = ({ month, year }) => {
//   const monthStart = DateTime.fromObject({ month, year });
//   return DateTime.fromObject({
//     day: monthStart.daysInMonth,
//     month,
//     year
//   });
// };
