import {ACTION_TYPE} from 'constants/strings';

export default function signin(state = {}, action) {
  switch (action.type) {
    case ACTION_TYPE('SIGNIN').SET:
      return {
        username: action.username || state.username,
        password: action.password || state.password,
      };

    case ACTION_TYPE('SIGNIN').CLEAR:
      return {};

    default:
      return state;
  }
}
