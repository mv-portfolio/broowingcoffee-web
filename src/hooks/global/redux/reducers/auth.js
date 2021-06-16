import {ACTION} from 'constants/strings';

export default function auth(state = {}, action) {
  switch (action.type) {
    case ACTION('AUTH').PEEK:
      return state;

    case ACTION('AUTH').SET:
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

    case ACTION('AUTH').CLEAR:
      return {
        primary_auth_token: state.primary_auth_token,
      };

    default:
      return state;
  }
}
