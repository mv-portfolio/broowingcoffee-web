import {isTypeof} from 'utils/checker';

export const purchasingProductInitState = ({discount, tempType, price, addons = []}) => ({
  discount: discount ? `${discount}` : '',
  tempType: tempType ? `${tempType}` : '',
  price: price ? `${price}` : '',
  addons: [...addons],
});

export default function purchasingProduct(
  state = purchasingProductInitState({}),
  action,
) {
  switch (action.type) {
    case 'set':
      return {
        discount: isTypeof('string', action.discount, state.discount),
        tempType: isTypeof('string', action.tempType, state.tempType),
        price: isTypeof('string', action.price, state.price),
        addons: isTypeof('array', action.addons, state.addons),
      };

    case 'clear':
      return purchasingProductInitState({});

    default:
      return state;
  }
}
