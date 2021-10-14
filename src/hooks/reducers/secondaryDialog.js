import {isTypeof} from 'utils/checker';

export const secondaryDialogInitState = {
  visible: false,
  children: null,
};
export default function secondaryDialog(state = secondaryDialogInitState, action) {
  switch (action.type) {
    case 'set':
      return {
        visible: isTypeof('boolean', action.visible, state.visible),
        children: isTypeof('object', action.children, state.children),
      };

    default:
      return state;
  }
}
