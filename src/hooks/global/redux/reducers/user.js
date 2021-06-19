import {ACTION_TYPE} from 'constants/strings';

export default function user(state = {}, action) {
  switch (action.type) {
    case ACTION_TYPE('USER').SET:
      return {
        firsname: action.firstname || state.firsname,
        lastname: action.lastname || state.lastname,
        username: action.username || state.username,
        email: action.email || state.email,
      };

    case ACTION_TYPE('USER').CLEAR:
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
