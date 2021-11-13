import {ACTION_TYPE} from 'constants/strings';
import {arrayFilter, arrayUpdate} from 'utils/checker';
import {arrayFind} from 'utils/helper';

export const itemsInitState = {
  items: [],
};

export default function inventory(state = itemsInitState, action) {
  switch (action.type) {
    case ACTION_TYPE('INVENTORY').PEEK:
      return state;

    case ACTION_TYPE('INVENTORY').PUSH:
      const item = arrayFind(state.items, {name: action.item.name});
      if (item) return state;
      return {
        items: [...state.items, action.item],
      };

    case ACTION_TYPE('INVENTORY').SET:
      return {
        items: action.items,
      };

    case ACTION_TYPE('INVENTORY-RESTOCK').SET_INDEX:
      //how will you compute cost if there is quantity
      const itemInventory = arrayFind(state.items, {name: action.item.name});
      const newState = arrayUpdate(
        state.items,
        {name: itemInventory.name},
        {
          quantity: itemInventory.quantity + action.item.quantity,
          cost: action.item.cost,
          date_modified: action.item.date_modified,
        },
      );
      return {
        items: newState,
      };

    case ACTION_TYPE('INVENTORY').SET_INDEX:
      return {
        items: arrayUpdate(state.items, {name: action.item.name}, action.item),
      };

    case ACTION_TYPE('INVENTORY').POP:
      return {
        items: arrayFilter(state.items, {name: action.itemId}),
      };

    default:
      return state;
  }
}
