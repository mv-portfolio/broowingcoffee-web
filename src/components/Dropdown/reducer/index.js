import {isTypeof} from 'utils/checker';

export const dropdownInitState = ({
  isDropdownListShow = false,
  value = '',
  styles = {},
}) => ({
  isDropdownListShow,
  value,
  styles,
});

export default function dropdown(state = dropdownInitState({}), action) {
  switch (action.type) {
    case 'set':
      return {
        isDropdownListShow: isTypeof(
          'boolean',
          action.isDropdownListShow,
          state.isDropdownListShow,
        ),
        value: isTypeof('string', action.value, state.value),
        styles: isTypeof('object', action.styles, state.styles),
      };

    default:
      return state;
  }
}
