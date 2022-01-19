import {ACTION_TYPE} from 'constants/strings';
import {isObject, isTypeof} from 'utils/checker';
import {arrayUpdate, arrayFind, arrayFilter} from 'utils/helper';

export const discountInitState = {
  discounts: [],
};

export default function discounts(state = discountInitState, action) {
  switch (action.type) {
    case ACTION_TYPE('DISCOUNTS').PEEK:
      return state;

    case ACTION_TYPE('DISCOUNTS').PUSH:
      const item = arrayFind(state.discounts, {name: action.discount.name});
      if (item || action.discount.name.length <= 2) return state;
      return {
        discounts: isObject(action.discount)
          ? [...state.discounts, action.discount]
          : state.discounts,
      };

    case ACTION_TYPE('DISCOUNTS').SET:
      return {
        discounts: isTypeof('array', action.discounts, state.discounts),
      };

    case ACTION_TYPE('DISCOUNTS').SET_INDEX:
      return {
        discounts: arrayUpdate(
          state.discounts,
          {_id: action.discount._id},
          action.discount,
        ),
      };

    case ACTION_TYPE('DISCOUNTS').POP:
      return {
        discounts: arrayFilter(state.discounts, {name: action.discount.name}),
      };

    default:
      return state;
  }
}
