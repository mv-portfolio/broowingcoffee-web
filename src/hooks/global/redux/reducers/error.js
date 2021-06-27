import {ACTION_TYPE} from 'constants/strings';

const initState = {
  errorRequest: '',
  errorAuth: '',
  errorSignin: '',
  errorForgotPassword: '',
};

export default function error(state = initState, action) {
  switch (action.type) {
    case ACTION_TYPE('ERROR').SET:
      return {
        errorRequest: action.errorRequest || state.errorRequest,
        errorAuth: action.errorAppAuth || state.errorAppAuth,
        errorSignin: action.errorSignin || state.errorSignin,
        errorForgotPassword: action.errorForgotPassword || state.errorForgotPassword,
      };

    case ACTION_TYPE('ERROR').CLEAR:
      return {};

    default:
      return state;
  }
}
