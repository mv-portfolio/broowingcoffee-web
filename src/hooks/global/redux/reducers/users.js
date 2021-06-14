import {ACTION} from 'constants/string';

export default function users(state = [], action) {
  switch (action.type) {
    case ACTION('USERS').PEEK:
      return state;

    case ACTION('USERS').SET:
      return action.user;

    case ACTION('USERS').CLEAR:
      return [];

    default:
      return state;
  }
}
