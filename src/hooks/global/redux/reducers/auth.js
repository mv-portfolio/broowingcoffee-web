import {ACTION_TYPE} from 'constants/strings';

const initState = {
  authenticated: undefined,
  primary_auth_token: '',
  secondary_auth_token: '',
};

export default function auth(state = initState, action) {
  switch (action.type) {
    case ACTION_TYPE('AUTH').PEEK:
      return state;

    case ACTION_TYPE('AUTH').SET:
      return {
        authenticated:
          String(action.authenticated).length !== 0
            ? action.authenticated
            : state.authenticated,
        primary_auth_token:
          action.primary_auth_token || state.primary_auth_token,
        secondary_auth_token:
          action.secondary_auth_token || state.secondary_auth_token,
      };

    case ACTION_TYPE('AUTH').CLEAR:
      return {
        ...initState,
        primary_auth_token: state.primary_auth_token,
      };

    default:
      return state;
  }
}
