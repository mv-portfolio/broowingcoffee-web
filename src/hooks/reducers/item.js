import {isTextChange} from 'utils/checker';

export const itemInitState = ({name, cost, itemType, quantity, date_expired}) => ({
  name: name ? `${name}` : '',
  cost: cost ? `${cost}` : '',
  itemType: itemType ? `${itemType}` : '',
  quantity: quantity ? `${quantity}` : '',
  date_expired: date_expired ? `${date_expired}` : null,
});

export default function item(state = itemInitState({}), action) {
  switch (action.type) {
    case 'set':
      return {
        name: isTextChange(action.name, state.name),
        cost: isTextChange(action.cost, state.cost),
        itemType: isTextChange(action.itemType, state.itemType),
        quantity: isTextChange(action.quantity, state.quantity),
        date_expired: isTextChange(action.date_expired, state.date_expired),
      };

    default:
      return state;
  }
}
