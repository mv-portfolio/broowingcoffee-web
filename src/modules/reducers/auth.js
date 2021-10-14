import {ACTION_TYPE} from 'constants/strings';
import {isTypeof} from 'utils/checker';

const initState = {
  authenticated: undefined,
  primary_auth_token: '',
  secondary_auth_token: '',
};

export default function auth(state = initState, action) {
  switch (action.type) {
    case ACTION_TYPE('AUTH').SET:
      return {
        authenticated: isTypeof('boolean', action.authenticated, state.authenticated),
        primary_auth_token: isTypeof(
          'string',
          action.primary_auth_token,
          state.primary_auth_token,
        ),
        secondary_auth_token: isTypeof(
          'string',
          action.secondary_auth_token,
          state.secondary_auth_token,
        ),
      };

    case ACTION_TYPE('AUTH').PEEK:
      return state;

    case ACTION_TYPE('AUTH').CLEAR:
      return {
        ...initState,
        primary_auth_token: state.primary_auth_token,
      };

    default:
      return state;
  }
}
