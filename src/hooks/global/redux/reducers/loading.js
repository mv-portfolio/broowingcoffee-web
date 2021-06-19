import {ACTION_TYPE} from 'constants/strings';

const initState = {
  status: false,
};

export default function loading(state = initState, action) {
  switch (action.type) {
    case ACTION_TYPE('LOADING').SET:
      return {
        status: action.status,
      };

    case ACTION_TYPE('LOADING').CLEAR:
      return {};

    default:
      return state;
  }
}
