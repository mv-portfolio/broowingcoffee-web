import {ACTION_TYPE} from 'constants/strings';
import {isTypeof} from 'utils/checker';

export const transactionInitState = {
  transactions: [],
  top_list: [],
  manipulated_data: [],
};

export default function transactions(state = transactionInitState, action) {
  switch (action.type) {
    case ACTION_TYPE('TRANSACTIONS').SET:
      return {
        transactions: isTypeof('array', action.transactions, state.transactions),
        top_list: isTypeof('array', action.top_list, state.top_list),
        manipulated_data: isTypeof(
          'array',
          action.manipulated_data,
          state.manipulated_data,
        ),
      };

    case ACTION_TYPE('TRANSACTIONS').PUSH:
      return {
        ...state,
        transactions: isTypeof('object')
          ? [...state.transactions, action.transaction]
          : state.transactions,
      };

    default:
      return state;
  }
}
