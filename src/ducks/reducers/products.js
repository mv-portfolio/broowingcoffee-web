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
      return {
        ...state,
        products: isObject(action.product)
          ? [...state.products, action.product]
          : state.products,
      };

    case ACTION_TYPE('PRODUCTS').SET_INDEX:
      const itemInventory = arrayFind(state.products, {_id: action.product._id});
      return {
        products: arrayUpdate(
          state.products,
          {_id: action.product._id},
          {...itemInventory, ...action.product},
        ),
      };
      return state;

    case ACTION_TYPE('PRODUCTS').SET:
      return {
        products: isTypeof('array', action.products, state.products),
      };

    case ACTION_TYPE('PRODUCTS').POP:
      const products = arrayFilter(state.products, {_id: action.product._id});
      return {
        products,
      };

    default:
      return state;
  }
}
