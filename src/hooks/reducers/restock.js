import {isTypeof} from 'utils/checker';

export const restockInitState = ({expiry_date}) => ({
  quantity: '',
  cost: '',
  expiry_date: expiry_date ? new Date(expiry_date) : new Date(),
});

export default function restock(state = restockInitState({}), action) {
  switch (action.type) {
    case 'set':
      return {
        quantity: isTypeof('string', action.quantity, state.quantity),
        cost: isTypeof('string', action.cost, state.cost),
        expiry_date: isTypeof('date', action.expiry_date, state.expiry_date),
      };

    default:
      return state;
  }
}
