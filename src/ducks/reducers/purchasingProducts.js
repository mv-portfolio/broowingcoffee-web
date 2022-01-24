import {ACTION_TYPE} from 'constants/strings';
import {isArray, isTypeof} from 'utils/checker';

export default function purchasingProducts(state = [], action) {
  switch (action.type) {
    case ACTION_TYPE('PURCHASING-PRODUCTS').SET:
      return action.purchasingProducts;

    case ACTION_TYPE('PURCHASING-PRODUCTS').PUSH:
      if (isArray(action.purchasingProduct)) {
        return [...state, ...action.purchasingProduct];
      }

      return [...state, action.purchasingProduct];

    case ACTION_TYPE('PURCHASING-PRODUCTS').SET_INDEX:
      let updatedState = state.map(purchasingProduct => {
        if (purchasingProduct.id === action.purchasingProduct.id) {
          return action.purchasingProduct;
        }
        return purchasingProduct;
      });
      return updatedState;

    case ACTION_TYPE('PURCHASING-PRODUCTS').POP:
      return state.filter(
        purchasingProduct => purchasingProduct.id !== action.purchasingProduct.id,
      );

    case ACTION_TYPE('PURCHASING-PRODUCTS').CLEAR:
      return [];

    default:
      return state;
  }
}
