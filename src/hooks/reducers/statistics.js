import {isTypeof} from 'utils/checker';

export const statisticsInitState = {
  filteredDate: [],
};

export default function statistics(state = statisticsInitState, action) {
  switch (action.type) {
    case 'set':
      return {
        filteredDate: isTypeof('array', action.filteredDate, state.filteredDate),
      };

    default:
      return state;
  }
}
