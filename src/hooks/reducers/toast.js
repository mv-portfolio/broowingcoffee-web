import {isTextBoolean, isTextChange} from 'utils/checker';

export const toastInitState = {
  isVisible: false,
  message: '',
};

export default function toast(state = toastInitState, action) {
  switch (action.type) {
    case 'set':
      return {
        isVisible: isTextBoolean(action.isVisible, state.isVisible),
        message: isTextChange(action.message, state.message),
      };

    default:
      return state;
  }
}
