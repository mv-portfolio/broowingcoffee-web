import {ACTION_TYPE} from 'constants/strings';

export default function users(state = [], action) {
  switch (action.type) {
    case ACTION_TYPE('USERS').PEEK:
      return state;

    case ACTION_TYPE('USERS').SET:
      return action.user;

    case ACTION_TYPE('USERS').CLEAR:
      return [];

    default:
      return state;
  }
}
