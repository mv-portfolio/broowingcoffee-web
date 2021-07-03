export default function assessInfo(state = {}, action) {
  switch (action.type) {
    case 'set':
      return {
        firstname: {
          text: action.firstname.text || state.firstname.text,
        },
        lastname: {
          text: action.lastname.text || state.lastname.text,
        },
      };
      
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
