import {ACTION} from 'constants/string';

export default function user(state = {}, action) {
  switch (action.type) {
    case ACTION('USER').SET:
      return {
        firsname: action.firstname || state.firsname,
        lastname: action.lastname || state.lastname,
        username: action.username || state.username,
        email: action.email || state.email,
        primary_auth_token:
          action.primary_auth_token || state.primary_auth_token,
        secondary_auth_token:
          action.secondary_auth_token || state.secondary_auth_token,
      };

    case ACTION('USER').CLEAR:
      return {
        firsname: '',
        lastname: '',
        username: '',
        email: '',
        primary_auth_token: '',
        secondary_auth_token: '',
      };

    default:
      return state;
  }
}
