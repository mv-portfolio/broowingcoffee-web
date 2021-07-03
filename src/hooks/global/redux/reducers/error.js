import {ACTION_TYPE} from 'constants/strings';
import isType from 'utils/isType';

const errorInitState = {
  page: '',
  auth: '',
  server: '',
  signin: '',
  request: '',
  forgotPassword: '',
  assessment: '',
};

export default function error(state = errorInitState, action) {
  switch (action.type) {
    case ACTION_TYPE('ERROR').SET:
      return {
        page: action.page || state.page,
        auth: action.auth || state.auth,
        server: action.server || state.server,
        request: action.request || state.request,
        //dont have save state
        signin: isType('string', action.signin, state.signin),
        forgotPassword: isType('string', action.forgotPassword, state.forgotPassword),
        //unsave state
        assessment: isType('string', action.assessment, state.assessment),
      };

    case ACTION_TYPE('ERROR').CLEAR:
      return errorInitState;

    default:
      return state;
  }
}
