import {ACTION_TYPE} from 'constants/strings';

export default function error(state = {}, action) {
  switch (action.type) {
    case ACTION_TYPE('ERROR').SET:
      return {
        errorCode: action.errorCode,
        name: action.name,
        message: action.message,
      };

    case ACTION_TYPE('ERROR').CLEAR:
      return {};

    default:
      return state;
  }
}
