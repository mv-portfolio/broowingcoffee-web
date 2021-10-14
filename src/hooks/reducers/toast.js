import {isTypeof} from 'utils/checker';

export const toastInitState = {
  isVisible: false,
  message: '',
};

export default function toast(state = toastInitState, action) {
  switch (action.type) {
    case 'set':
      return {
        isVisible: isTypeof('boolean', action.isVisible, state.isVisible),
        message: isTypeof('string', action.message, state.message),
      };

    default:
      return state;
  }
}
