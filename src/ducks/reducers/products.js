import {ACTION_TYPE} from 'constants/strings';
import {arrayFilter, arrayUpdate, isObject, isTypeof} from 'utils/checker';
import {arrayFind} from 'utils/helper';

export const productsInitState = {
  products: [],
};

export default function products(state = productsInitState, action) {
  switch (action.type) {
    case ACTION_TYPE('PRODUCTS').PEEK:
      return state;

    case ACTION_TYPE('PRODUCTS').PUSH:
      const product = arrayFind(state.products, {name: action.product.name});
      if (product || action.product.name.length <= 1) return state;
      return {
        ...state,
        products: isObject(action.product)
          ? [...state.products, action.product]
          : state.products,
      };

    case ACTION_TYPE('PRODUCTS').SET_INDEX:
      const itemInventory = arrayFind(state.products, {name: action.product.name});
      return {
        products: arrayUpdate(
          state.products,
          {name: action.product.name},
          {...itemInventory, ...action.product},
        ),
      };

    case ACTION_TYPE('PRODUCTS').SET:
      return {
        products: isTypeof('array', action.products, state.products),
      };

    case ACTION_TYPE('PRODUCTS').POP:
      const products = arrayFilter(state.products, {name: action.product.name});
      return {
        products,
      };

    default:
      return state;
  }
}
