import {isTypeof} from 'utils/checker';

const currentDate = new Date();

export const generateReportsInitState = {
  filter_date: {
    min: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
    ),
    max: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1,
    ),
  },
  type_report: '',
  data: [],
};

export default function generateReports(state = generateReportsInitState, action) {
  switch (action.type) {
    case 'set':
      return {
        filter_date: isTypeof('object', action.filter_date, state.filter_date),
        type_report: isTypeof('string', action.type_report, state.type_report),
        data: isTypeof('array', action.data, state.data),
      };

    default:
      return state;
  }
}
