import {isComponent, isTextBoolean} from 'utils/checker';

export const secondaryDialogInitState = {
  visible: false,
  children: null,
};
export default function secondaryDialog(state = secondaryDialogInitState, action) {
  switch (action.type) {
    case 'set':
      return {
        visible: isTextBoolean(action.visible, state.visible),
        children: isComponent(action.children, state.children),
      };

    default:
      return state;
  }
}
