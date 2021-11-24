import {isTypeof} from 'utils/checker';

export const datePickerInitState = ({
  date = new Date(),
  startDate = new Date('january 1 1980'),
  endDate = new Date('january 1 2030'),
  isPickerShow = false,
}) => ({
  date,
  startDate,
  endDate,
  isPickerShow,
});

export default function datePicker(state = datePickerInitState({}), action) {
  switch (action.type) {
    case 'set':
      return {
        date: isTypeof('date', action.date, state.date),
        startDate: isTypeof('date', action.startDate, state.startDate),
        endDate: isTypeof('date', action.endDate, state.endDate),
        isPickerShow: isTypeof('boolean', action.isPickerShow, state.isPickerShow),
      };

    default:
      return state;
  }
}
