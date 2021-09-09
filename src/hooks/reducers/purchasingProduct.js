import {isArray, isTextChange, isTextNumber} from 'utils/checker';

export const purchasingProductInitState = ({discount, tempType, price, addons}) => ({
  discount: isTextNumber(discount, ''),
  tempType: isTextChange(tempType, ''),
  price: isTextNumber(price, ''),
  addons: isArray(addons) ? addons : undefined,
});
export default function purchasingProduct(
  state = purchasingProductInitState({}),
  action,
) {
  switch (action.type) {
    case 'set':
      return {
        discount: isTextChange(action.discount, state.discount),
        tempType: isTextChange(action.tempType, state.tempType),
        price: isTextChange(action.price, state.price),
        addons: isArray(action.addons) ? action.addons : state.addons,
      };

    case 'clear':
      return purchasingProductInitState;

    default:
      return state;
  }
}
