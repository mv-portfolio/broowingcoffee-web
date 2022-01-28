import {isTypeof} from 'utils/checker';

const date = new Date();

export const statisticsInitState = {
  filteredDate: [date.getFullYear(), date.getMonth() + 1],
  graphStyle: {},
};

export default function statistics(state = statisticsInitState, action) {
  switch (action.type) {
    case 'set':
      return {
        filteredDate: isTypeof('array', action.filteredDate, state.filteredDate),
        graphStyle: isTypeof('object', action.graphStyle, state.graphStyle),
      };

    default:
      return state;
  }
}
