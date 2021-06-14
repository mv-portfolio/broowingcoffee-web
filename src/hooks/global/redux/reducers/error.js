import {ACTION} from 'constants/string';

export default function error(state = {}, action) {
  switch (action.type) {
    case ACTION('ERROR').SET:
      return {
        errorCode: action.errorCode,
        name: action.name,
        message: action.message,
      };

    case ACTION('ERROR').CLEAR:
      return {};

    default:
      return state;
  }
}
