import {ACTION} from 'constants/string';

export default function session(state = {}, action) {
  switch (action.type) {
    case ACTION('SESSION').SET:
      return {
        username: action.username || state.username,
        password: action.password || state.password,
      };

    case ACTION('SESSION').CLEAR:
      return {};

    default:
      return state;
  }
}
