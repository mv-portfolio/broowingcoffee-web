import {isTypeof} from 'utils/checker';

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
        name: isTypeof('string', action.name, state.name),
        cost: isTypeof('string', action.cost, state.cost),
        itemType: isTypeof('string', action.itemType, state.itemType),
        quantity: isTypeof('string', action.quantity, state.quantity),
        date_expired: isTypeof('string', action.date_expired, state.date_expired),
      };

    default:
      return state;
  }
}
