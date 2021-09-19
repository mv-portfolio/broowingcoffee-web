import {ACTION_TYPE} from 'constants/strings';

export const transactionsInitState = {
  transactions: [],
};

export default function transactions(state = transactionsInitState, action) {
  switch (action.type) {
    case ACTION_TYPE('TRANSACTIONS').PEEK:
      return state;

    case ACTION_TYPE('TRANSACTIONS').PUSH:
      return {
        transactions: [...state.transactions, action.transaction],
      };

    default:
      return state;
  }
}
