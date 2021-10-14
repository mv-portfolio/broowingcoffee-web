import {isTypeof} from 'utils/checker';

export const productAddonsInitState = ({name, price}) => ({
  name: name ? `${name}` : '',
  price: price ? `${price}` : '',
});

export default function productAddons(state = productAddonsInitState({}), action) {
  switch (action.type) {
    case 'set':
      return {
        name: isTypeof('string', action.name, state.name),
        price: isTypeof('string', action.price, state.price),
      };

    default:
      return state;
  }
}
