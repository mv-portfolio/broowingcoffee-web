import {ACTION_TYPE} from 'constants/strings';
import {
  arrayFilter,
  arrayUpdate,
  isArray,
  isObject,
  isString,
  isTypeof,
} from 'utils/checker';
import {arrayFind} from 'utils/helper';

export const productsInitState = {
  main: [],
  addons: [],
};

export default function products(state = productsInitState, action) {
  switch (action.type) {
    case ACTION_TYPE('PRODUCTS').SET:
      return {
        main: isTypeof('array', action.main, state.main),
        addons: isTypeof('array', action.addons, state.addons),
      };

    case ACTION_TYPE('PRODUCTS').PUSH:
      if (action.mainProduct) {
        const mainProduct = arrayFind(state.main, {name: action.mainProduct.name});
        if (mainProduct || action.mainProduct.name.length <= 1) return state;
        return {
          ...state,
          main: isObject(action.mainProduct)
            ? [...state.main, action.mainProduct]
            : state.main,
        };
      }

      const addon = arrayFind(state.addons, {name: action.addonProduct.name});
      if (addon || action.addonProduct.name.length <= 1) return state;
      return {
        ...state,
        addons: isObject(action.addonProduct)
          ? [...state.addons, action.addonProduct]
          : state.addons,
      };

    case ACTION_TYPE('PRODUCTS').POP:
      return {
        main: isString(action.mainId)
          ? arrayFilter(state.main, {name: action.mainId})
          : state.main,
        addons: isString(action.addonId)
          ? arrayFilter(state.addons, {name: action.addonId})
          : state.addons,
      };

    case ACTION_TYPE('PRODUCTS').SET_INDEX:
      return {
        main: isObject(action.payload)
          ? arrayUpdate(state.main, {name: action.mainId}, action.payload)
          : state.main,
        addons: isObject(action.payload)
          ? arrayUpdate(state.addons, {name: action.addonId}, action.payload)
          : state.addons,
      };

    default:
      return state;
  }
}
