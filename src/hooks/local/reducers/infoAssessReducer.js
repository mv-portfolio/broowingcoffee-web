export default function infoAssessReducer(state = {}, action) {
  switch (action.type) {
    case 'set-firstname':
      return {
        ...state,
        firstname: {
          text: action.text,
        },
      };

    case 'set-lastname':
      return {
        ...state,
        lastname: {
          text: action.text,
        },
      };

    default:
      return state;
  }
}
