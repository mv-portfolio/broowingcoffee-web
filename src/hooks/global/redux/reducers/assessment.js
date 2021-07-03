import {ACTION_TYPE} from 'constants/strings';

export default function assessment(state = {}, action) {
  switch (action.type) {
    case ACTION_TYPE().ASSESS_AUTH:
      return state;

    case ACTION_TYPE('ASSESSMENT').SET:
      return {
        data: action.data,
      };

    case ACTION_TYPE('ASSESSMENT').CLEAR:
      return {};

    default:
      return state;
  }
}
