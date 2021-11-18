import {ACTION_TYPE} from 'constants/strings';
import {isTypeof, isArray} from 'utils/checker';

export const reportsInitState = {
  transactionHistories: [],
  otherHistories: [],
};

export default function reports(state = reportsInitState, action) {
  switch (action.type) {
    case ACTION_TYPE('REPORTS').PEEK:
      return state;

    case ACTION_TYPE('REPORTS').SET:
      return {
        transactionHistories: isTypeof(
          'array',
          action.transactionHistories,
          state.transactionHistories,
        ),
        otherHistories: isTypeof('array', action.otherHistories, state.otherHistories),
      };

    case ACTION_TYPE('REPORTS').PUSH:
      return {
        ...state,
        transactionHistories: isArray(action.transactionHistory)
          ? [...state.transactionHistories, action.transactionHistory]
          : state.transactionHistories,
        otherHistories: isArray(action.otherHistory)
          ? [...state.otherHistories, action.otherHistory]
          : state.otherHistories,
      };

    case ACTION_TYPE('REPORTS').CLEAR:
      return reportsInitState;

    default:
      return state;
  }
}
