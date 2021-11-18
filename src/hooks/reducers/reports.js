import {isTypeof} from 'utils/checker';

export const reportsInitState = {
  transactionsSearch: '',
  otherSearch: '',
};

export default function reports(state = reportsInitState, action) {
  switch (action.type) {
    case 'set':
      return {
        transactionsSearch: isTypeof(
          'string',
          action.transactionsSearch,
          state.transactionsSearch,
        ),
        otherSearch: isTypeof(
          'string',
          action.otherSearch,
          state.otherSearch,
        ),
      };

    default:
      return state;
  }
}
