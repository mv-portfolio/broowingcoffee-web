import {isTypeof} from 'utils/checker';

export const productsInitState = {
  main: '',
  addon: '',
};

export default function Products(state = productsInitState, action) {
  switch (action.type) {
    case 'set':
      return {
        main: isTypeof('string', action.main, state.main),
        addon: isTypeof('string', action.addon, state.addon),
      };

    default:
      return state;
  }
}
