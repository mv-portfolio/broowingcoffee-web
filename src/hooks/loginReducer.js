export default function loginReducer(state = {}, action) {
  switch (action.type) {
    case 'set-username':
      return {
        ...state,
        username: {
          text: action.text,
        },
      };

    case 'set-password':
      return {
        ...state,
        password: {
          text: action.text,
          isEncrypted: action.isEncrypted,
        },
      };

    default:
      return state;
  }
}
