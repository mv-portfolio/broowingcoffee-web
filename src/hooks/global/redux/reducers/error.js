import {ACTION_TYPE} from 'constants/strings';

const initState = {
  page: '',
  auth: '',
  server: '',
  signin: '',
  request: '',
  forgotPassword: '',
};

export default function error(state = initState, action) {
  switch (action.type) {
    case ACTION_TYPE('ERROR').SET:
      return {
        page: action.page || state.page,
        auth: action.auth || state.auth,
        server: action.server || state.server,
        request: action.request || state.request,
        //dont have save state
        signin: typeof action.signin === 'string' ? action.signin : state.signin,
        forgotPassword: typeof action.forgotPassword === 'string' ? action.forgotPassword : state.forgotPassword,
      };

    case ACTION_TYPE('ERROR').CLEAR:
      return {};

    default:
      return state;
  }
}
