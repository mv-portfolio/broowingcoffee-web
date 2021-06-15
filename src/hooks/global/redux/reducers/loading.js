import {ACTION} from 'constants/string';

const initState = {
  status: false,
};

export default function loading(state = initState, action) {
  switch (action.type) {
    case ACTION('LOADING').SET:
      return {
        status: action.status,
      };

    case ACTION('LOADING').CLEAR:
      return {};

    default:
      return state;
  }
}
