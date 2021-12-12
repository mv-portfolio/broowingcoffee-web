import {ACTION_TYPE} from 'constants/strings';

export const assessmentInitState = {
  data: {},
};

export default function assessment(state = assessmentInitState, action) {
  switch (action.type) {
    case ACTION_TYPE('ASSESSMENT').AUTH:
      return state;

    case ACTION_TYPE('ASSESSMENT').SET:
      return {
        data: action.data,
      };

    case ACTION_TYPE('ASSESSMENT').CLEAR:
      return assessmentInitState;

    default:
      return state;
  }
}
