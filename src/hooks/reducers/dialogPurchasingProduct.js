import {isTypeof} from 'utils/checker';

export const dialogPurchasingProductInitState = ({
  _id_discount = {},
  product_type,
  size,
  numAvail,
  price,
}) => ({
  _id_discount: _id_discount ? _id_discount : {},
  product_type: product_type ? `${product_type}` : '',
  size: size ? `${size}` : '',
  numAvail: '1',
  price: price ? `${price}` : '',
});

export default function dialogPurchasingProduct(
  state = dialogPurchasingProductInitState({}),
  action,
) {
  switch (action.type) {
    case 'set':
      return {
        _id_discount: isTypeof('object', action._id_discount, state._id_discount),
        product_type: isTypeof('string', action.product_type, state.product_type),
        size: isTypeof('string', action.size, state.size),
        numAvail: isTypeof('string', action.numAvail, state.numAvail),
        price: isTypeof('string', action.price, state.price),
      };

    case 'clear':
      return dialogPurchasingProductInitState({});

    default:
      return state;
  }
}
