import {isTextChange} from 'utils/checker';

export const productsInitState = {
  main: '',
  addon: '',
};

export default function Products(state = productsInitState, action) {
  switch (action.type) {
    case 'set':
      return {
        main: isTextChange(action.main, state.main),
        addon: isTextChange(action.addon, state.addon),
      };

    default:
      return state;
  }
}
