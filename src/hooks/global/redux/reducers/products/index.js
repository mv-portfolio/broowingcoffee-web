import {ACTION} from 'constants/string';

export default function productReducer(state = [], action) {
  switch (action.type) {
    case ACTION.PEEK:
      return state;

    case ACTION.PUSH:
      return [...state, action.product];

    case ACTION.POP:
      return state.filter(item => item.id !== action.product.id);

    default:
      return state;
  }
}
