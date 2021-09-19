import {ACTION_TYPE} from 'constants/strings';
import {arrayFilter, arrayUpdate} from 'utils/checker';

export const itemsInitState = {
  items: [],
};

export default function inventory(state = itemsInitState, action) {
  switch (action.type) {
    case ACTION_TYPE('INVENTORY').PEEK:
      return state;

    case ACTION_TYPE('INVENTORY').PUSH:
      return {
        items: [...state.items, action.item],
      };

    case ACTION_TYPE('INVENTORY').POP:
      return {
        items: arrayFilter(state.items, {name: action.itemId}),
      };

    case ACTION_TYPE('INVENTORY').SET:
      return {
        items: action.items,
      };

    case ACTION_TYPE('INVENTORY').SET_INDEX:
      return {
        items: arrayUpdate(state.items, {name: action.itemId}, action.payload),
      };

    default:
      return state;
  }
}
