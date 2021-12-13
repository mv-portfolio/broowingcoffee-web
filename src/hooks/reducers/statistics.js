import {isTypeof} from 'utils/checker';

export const statisticsInitState = {
  filteredDate: [],
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
