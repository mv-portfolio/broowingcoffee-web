import {numberFormatter} from 'utils/Formatter';

export const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getDays = (month, year) => {
  return new Date(year, month, 0).getDate();
};

export const getMonthDays = (month, year) => {
  const days = getDays(month, year);
  let tempDays = [];
  for (let i = 0; i < days; i++) {
    tempDays.push(numberFormatter(i + 1));
  }
  return tempDays;
};

export const getYears = (startDate, endDate) => {
  let tempYears = [];
  for (let i = startDate.getFullYear(); i <= endDate.getFullYear(); i++) {
    tempYears.push(`${i}`);
  }
  return tempYears;
};
