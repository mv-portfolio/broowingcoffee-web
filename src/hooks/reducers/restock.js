import {isTypeof} from 'utils/checker';

export const restockInitState = {
  quantity: '',
  cost: '',
};

export default function restock(state = restockInitState, action) {
  switch (action.type) {
    case 'set':
      return {
        quantity: isTypeof('string', action.quantity, state.quantity),
        cost: isTypeof('string', action.cost, state.cost),
      };

    default:
      return state;
  }
}
