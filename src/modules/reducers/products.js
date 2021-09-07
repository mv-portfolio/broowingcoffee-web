import {ACTION_TYPE} from 'constants/strings';
import {isArray} from 'utils/checker';

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

    case ACTION_TYPE('PRODUCT').PUSH:
      return [...state, action.product];

    case ACTION_TYPE('PRODUCT').POP:
      return state.filter(item => item.id !== action.product.id);

    default:
      return state;
  }
}
