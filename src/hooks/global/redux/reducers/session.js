import {ACTION_TYPE} from 'constants/strings';

export default function session(state = {}, action) {
  switch (action.type) {
    case ACTION_TYPE('SESSION').SET:
      return {
        username: action.username || state.username,
        password: action.password || state.password,
      };

    case ACTION_TYPE('SESSION').CLEAR:
      return {};

    default:
      return state;
  }
}
