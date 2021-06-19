import {ACTION_TYPE} from 'constants/strings';

export default function forgotPassword(state = {}, action) {
  switch (action.type) {
    case ACTION_TYPE('FORGOT-PASSWORD').SET:
      return {
        email: action.email,
      };

    case ACTION_TYPE('FORGOT-PASSWORD').CLEAR:
      return {};

    default:
      return state;
  }
}
