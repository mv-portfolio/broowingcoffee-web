import {ACTION_TYPE} from 'constants/strings';
import {isTextBoolean, isTextChange} from 'utils/checker';

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
        _id: isTextChange(action._id, state._id),
        firstname: isTextChange(action.firstname, state.firstname),
        lastname: isTextChange(action.lastname, state.lastname),
        username: isTextChange(action.username, state.username),
        email: isTextChange(action.email, state.email),
        isAssessed: isTextBoolean(action.isAssessed, state.isAssessed),
      };

    case ACTION_TYPE('USER').CLEAR:
      return userInitState;

    default:
      return state;
  }
}
