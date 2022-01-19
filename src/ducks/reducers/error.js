import {ACTION_TYPE} from 'constants/strings';
import {isTypeof} from 'utils/checker';

const errorInitState = {
  page: '',
  auth: '',
  server: '',
  signin: '',
  request: '',
  forgotPassword: '',
  assessment: '',
  transaction: '',
  product: '',
  inventory: '',
  report: '',
  discount: '',
};

export default function error(state = errorInitState, action) {
  switch (action.type) {
    case ACTION_TYPE('ERROR').SET:
      return {
        page: isTypeof('string', action.page, state.page),
        auth: isTypeof('string', action.auth, state.auth),
        server: isTypeof('string', action.server, state.server),
        request: isTypeof('string', action.request, state.request),
        signin: isTypeof('string', action.signin, state.signin),
        forgotPassword: isTypeof('string', action.forgotPassword, state.forgotPassword),
        assessment: isTypeof('string', action.assessment, state.assessment),
        transaction: isTypeof('string', action.transaction, state.transaction),
        product: isTypeof('string', action.product, state.product),
        inventory: isTypeof('string', action.inventory, state.inventory),
        report: isTypeof('string', action.report, state.report),
        discount: isTypeof('string', action.discount, state.discount),
      };

    case ACTION_TYPE('ERROR').CLEAR:
      return errorInitState;

    default:
      return state;
  }
}
