import {ACTION_TYPE} from 'constants/strings';
import {arrayFilter, arrayUpdate, isArray, isObject, isString} from 'utils/checker';

export const productsInitState = {
  main: [],
  addons: [],
};

export default function products(state = productsInitState, action) {
  switch (action.type) {
    case ACTION_TYPE('PRODUCTS').SET:
      return {
        main: isArray(action.main) ? action.main : state.main,
        addons: isArray(action.addons) ? action.addons : state.addons,
      };

    case ACTION_TYPE('PRODUCTS').PUSH:
      return {
        main: isObject(action.mainProduct)
          ? [...state.main, action.mainProduct]
          : state.main,
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
