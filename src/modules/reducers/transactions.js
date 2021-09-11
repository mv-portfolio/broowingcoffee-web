import {ACTION_TYPE} from 'constants/strings';

export const transactions = {
  transactions: [],
};

export default function transactions(state = transactions, action) {
  switch (action.type) {
    case ACTION_TYPE('TRANSACTIONS').PEEK:
      return state;

    case ACTION_TYPE('TRANSACTIONS').PUSH:
      return {
        transactions: [...state.transactions, action.transactions],
      };

    default:
      return state;
  }
}
