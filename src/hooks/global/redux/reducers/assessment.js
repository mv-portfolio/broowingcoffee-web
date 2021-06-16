import {ACTION} from 'constants/strings';

export default function assessment(state = {}, action) {
  switch (action.type) {
    case ACTION().ASSESS_AUTH:
      return state;

    case ACTION('ASSESSMENT').SET:
      return {
        isAssessed: action.isAssessed,
        token: action.token,
      };

    case ACTION('ASSESSMENT').CLEAR:
      return {};

    default:
      return state;
  }
}
