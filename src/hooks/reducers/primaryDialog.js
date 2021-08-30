import {isComponent, isTextBoolean} from 'utils/checker';

export const primaryDialogInitState = {
  visible: false,
  children: null,
};
export default function primaryDialog(state = primaryDialogInitState, action) {
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
