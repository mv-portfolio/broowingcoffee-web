import {isTypeof} from 'utils/checker';

export const dialogPurchasingInitState = ({
  discount = {},
  product_type,
  size,
  numAvail,
  price,
}) => ({
  discount: discount,
  product_type: product_type ? `${product_type}` : '',
  size: size ? `${size}` : '',
  numAvail: '1',
  price: price ? `${price}` : '',
});

export default function dialogPurchasing(state = dialogPurchasingInitState({}), action) {
  switch (action.type) {
    case 'set':
      return {
        discount: isTypeof('object', action.discount, state.discount),
        product_type: isTypeof('string', action.product_type, state.product_type),
        size: isTypeof('string', action.size, state.size),
        numAvail: isTypeof('string', action.numAvail, state.numAvail),
        price: isTypeof('string', action.price, state.price),
      };

    case 'clear':
      return dialogPurchasingInitState({});

    default:
      return state;
  }
}
