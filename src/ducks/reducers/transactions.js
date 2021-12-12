import {ACTION_TYPE} from 'constants/strings';
import {isTypeof} from 'utils/checker';

export const transactionsInitState = {
  data: [],
  topList: [],
  manipulatedData: [],
};

export default function transactions(state = transactionsInitState, action) {
  switch (action.type) {
    case ACTION_TYPE('TRANSACTIONS').SET:
      return {
        data: isTypeof('array', action.data, state.data),
        topList: isTypeof('array', action.topList, state.topList),
        manipulatedData: isTypeof('array', action.manipulatedData, state.manipulatedData),
      };

    case ACTION_TYPE('TRANSACTIONS').PUSH:
      return {
        ...state,
        data: [...state.data, action.transaction],
      };

    default:
      return state;
  }
}
