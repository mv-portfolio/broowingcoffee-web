export default function loginReducer(state = {}, action) {
  switch (action.type) {
    case 'set-username':
      return {
        ...state,
        username: {
          text: action.text,
        },
      };

    case 'set-email':
      return {
        ...state,
        email: {
          text: action.text,
        },
      };

    case 'set-password':
      return {
        ...state,
        password: {
          text: action.text,
          strength: action.strength,
        },
        confirmPassword: {
          ...state.confirmPassword,
          isMatched: action.isMatched,
        },
      };

    case 'set-confirm-password':
      return {
        ...state,
        confirmPassword: {
          text: action.text,
          isMatched: action.isMatched,
          isEncrypted: action.isEncrypted,
        },
      };

    default:
      return state;
  }
}
