import {ACTION_TYPE} from 'constants/strings';
import {arrayFilter, arrayUpdate, isObject, isTypeof} from 'utils/checker';
import {arrayFind} from 'utils/helper';

export const itemsInitState = {
  items: [],
};

export default function inventory(state = itemsInitState, action) {
  switch (action.type) {
    case ACTION_TYPE('INVENTORY').PEEK:
      return state;

    case ACTION_TYPE('INVENTORY').PUSH:
      return {
        items: isObject(action.item) ? [...state.items, action.item] : state.items,
      };

    case ACTION_TYPE('INVENTORY').SET:
      return {
        items: isTypeof('array', action.items, state.items),
      };

    case ACTION_TYPE('INVENTORY').SET_INDEX:
      const itemInventory = arrayFind(state.items, {name: action.item.name});
      return {
        items: arrayUpdate(
          state.items,
          {name: action.item.name},
          {...itemInventory, ...action.item},
        ),
      };

    case ACTION_TYPE('INVENTORY').POP:
      const items = arrayFilter(state.items, {name: action.item.name});
      return {
        items,
      };

    default:
      return state;
  }
}
