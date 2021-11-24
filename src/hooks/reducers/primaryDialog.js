import {isTypeof} from 'utils/checker';

export const primaryDialogInitState = {
  visible: false,
  children: null,
  disabledTouchOutside: true,
};
export default function primaryDialog(state = primaryDialogInitState, action) {
  switch (action.type) {
    case 'set':
      return {
        visible: isTypeof('boolean', action.visible, state.visible),
        children: isTypeof('object', action.children, state.children),
        disabledTouchOutside: isTypeof(
          'boolean',
          action.disabledTouchOutside,
          state.disabledTouchOutside,
        ),
      };

    default:
      return state;
  }
}
