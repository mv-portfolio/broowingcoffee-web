import {ACTION} from 'constants/strings';

export default function products(state = [], action) {
  switch (action.type) {
    case ACTION('PRODUCTS').PEEK:
      return state;

    case ACTION('PRODUCTS').SET:
      return action.products;

    case ACTION('PRODUCT').PUSH:
      return [...state, action.product];

    case ACTION('PRODUCT').POP:
      return state.filter(item => item.id !== action.product.id);

    default:
      return state;
  }
}
