import {ACTION_TYPE} from 'constants/strings';

const initState = {
  status: false,
  message: '',
};

export default function loading(state = initState, action) {
  switch (action.type) {
    case ACTION_TYPE('LOADING').SET:
      return {
        status: action.status,
        message: action.message,
      };

    case ACTION_TYPE('LOADING').CLEAR:
      return initState;

    default:
      return state;
  }
}
