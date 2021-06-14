import {ACTION} from 'constants/string';

export default function auth(state = {}, action) {
  switch (action.type) {
    case ACTION('AUTH').SET:
      return {
        authenticated: action.authenticated || state.authenticated,
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
