import {isTypeof} from 'utils/checker';

export const headerInitState = {
  title: 'Transaction',
  isMenuListShow: false,
};

export default function header(state = headerInitState, action) {
  switch (action.type) {
    case 'set':
      return {
        title: isTypeof('string', action.title, state.title),
        isMenuListShow: isTypeof('boolean', action.isMenuListShow, state.isMenuListShow),
      };

    case 'clear':
      return headerInitState;

    default:
      return state;
  }
}
