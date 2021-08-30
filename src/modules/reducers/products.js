import {ACTION_TYPE} from 'constants/strings';

export default function products(state = [], action) {
  switch (action.type) {
    case ACTION_TYPE('PRODUCTS').PEEK:
      return state;

    case ACTION_TYPE('PRODUCTS').SET:
      return action.products;

    case ACTION_TYPE('PRODUCT').PUSH:
      return [...state, action.product];

    case ACTION_TYPE('PRODUCT').POP:
      return state.filter(item => item.id !== action.product.id);

    default:
      return state;
  }
}
