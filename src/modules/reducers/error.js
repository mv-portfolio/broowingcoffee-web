import {ACTION_TYPE} from 'constants/strings';
import {isTextChange} from 'utils/checker';

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
        page: isTextChange(action.page, state.page),
        auth: isTextChange(action.auth, state.auth),
        server: isTextChange(action.server, state.server),
        request: isTextChange(action.request, state.request),
        signin: isTextChange(action.signin, state.signin),
        forgotPassword: isTextChange(action.forgotPassword, state.forgotPassword),
        assessment: isTextChange(action.assessment, state.assessment),
      };

    case ACTION_TYPE('ERROR').CLEAR:
      return errorInitState;

    default:
      return state;
  }
}
