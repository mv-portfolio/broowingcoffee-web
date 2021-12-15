import {isTypeof} from 'utils/checker';

export const settignsInitState = initState => ({
  'always show details product': initState['always show details product'] || false,
});

export default function settings(state = settignsInitState, action) {
  switch (action.type) {
    case 'set':
      return {
        'always show details product': isTypeof(
          'boolean',
          action['always show details product'],
          state['always show details product'],
        ),
      };

    default:
      return state;
  }
}
