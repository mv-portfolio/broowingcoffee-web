import {isTextChange} from 'utils/checker';

export const productAddonsInitState = ({name, price}) => ({
  name: name ? `${name}` : '',
  price: price ? `${price}` : '',
});

export default function productAddons(state = productAddonsInitState({}), action) {
  switch (action.type) {
    case 'set':
      return {
        name: isTextChange(action.name, state.name),
        price: isTextChange(action.price, state.price),
      };

    default:
      return state;
  }
}
