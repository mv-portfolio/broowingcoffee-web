import {ACTION} from 'constants/strings';

export default function user(state = {}, action) {
  switch (action.type) {
    case ACTION('USER').SET:
      return {
        firsname: action.firstname || state.firsname,
        lastname: action.lastname || state.lastname,
        username: action.username || state.username,
        email: action.email || state.email,
      };

    case ACTION('USER').CLEAR:
      return {
        firsname: '',
        lastname: '',
        username: '',
        email: '',
      };

    default:
      return state;
  }
}
