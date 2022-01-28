import {ACTION_TYPE} from 'constants/strings';
import {isObject, isTypeof} from 'utils/checker';
import {arrayFilter, arrayFind} from 'utils/helper';

export const productBaseInitState = {
  bases: [],
};

export default function productBase(state = productBaseInitState, action) {
  switch (action.type) {
    case ACTION_TYPE('PRODUCT-BASE').PEEK:
      return state;

    case ACTION_TYPE('PRODUCT-BASE').PUSH:
      return {
        ...state,
        bases: isObject(action.base) ? [...state.bases, action.base] : state.bases,
      };

    case ACTION_TYPE('PRODUCT-BASE').SET:
      return {
        bases: isTypeof('array', action.bases, state.bases),
      };

    case ACTION_TYPE('PRODUCT-BASE').POP:
      const bases = arrayFilter(state.bases, {name: action.base.name});
      return {
        bases,
      };

    default:
      return state;
  }
}
