import {ACTION_TYPE} from 'constants/strings';
import isType from 'utils/isType';

export const userInitState = {_id: '', firstname: '', lastname: '', username: '', email: ''};

export default function user(state = userInitState, action) {
  switch (action.type) {
    case ACTION_TYPE('USER').SET:
      return {
        _id: action._id || state._id,
        firstname: isType('string', action.firstname, state.firstname),
        lastname: isType('string', action.lastname, state.firstname),
        username: isType('string', action.username, state.username),
        email: isType('string', action.email, state.email),
      };

    case ACTION_TYPE('USER').CLEAR:
      return userInitState;

    default:
      return state;
  }
}
