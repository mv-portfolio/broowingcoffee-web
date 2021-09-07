import {ACTION_TYPE} from 'constants/strings';

export default function purchasingProducts(state = [], action) {
  switch (action.type) {
    case ACTION_TYPE('PURCHASING-PRODUCT').SET:
      return action.purchasingProducts;

    case ACTION_TYPE('PURCHASING-PRODUCT').SET_INDEX:
      let updatedState = state.map(purchasingProduct => {
        if (purchasingProduct.id === action.purchasingProduct.id) {
          return action.purchasingProduct;
        }
        return purchasingProduct;
      });

      return updatedState;

    case ACTION_TYPE('PURCHASING-PRODUCT').PUSH:
      return [...state, action.purchasingProduct];

    case ACTION_TYPE('PURCHASING-PRODUCT').POP:
      return state.filter(
        purchasingProduct => purchasingProduct.id !== action.purchasingProductId,
      );

    default:
      return state;
  }
}
