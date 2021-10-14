import {ACTION_TYPE} from 'constants/strings';
import {isTypeof} from 'utils/checker';

export const userInitState = {
  _id: '',
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  isAssessed: false,
};

export default function user(state = userInitState, action) {
  switch (action.type) {
    case ACTION_TYPE('USER').SET:
      return {
        _id: isTypeof('string', action._id, state._id),
        firstname: isTypeof('string', action.firstname, state.firstname),
        lastname: isTypeof('string', action.lastname, state.lastname),
        username: isTypeof('string', action.username, state.username),
        email: isTypeof('string', action.email, state.email),
        isAssessed: isTypeof('boolean', action.isAssessed, state.isAssessed),
      };

    case ACTION_TYPE('USER').CLEAR:
      return userInitState;

    default:
      return state;
  }
}
