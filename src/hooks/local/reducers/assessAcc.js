export default function assessAcc(state = {}, action) {
  switch (action.type) {
    case 'set':
      return {
        username: {
          text: action.username.text || state.username.text,
        },
        email: {
          text: action.email.text || state.email.text,
        },
        password: {
          text: action.password.text || state.password.text,
          strength: action.password.strength || state.password.strength,
        },
        confirmPassword: {
          text: action.confirmPassword.text || state.confirmPassword.text,
          isMatched: action.confirmPassword.isMatched || state.confirmPassword.isMatched,
          isEncrypted: action.confirmPassword.isEncrypted || state.confirmPassword.isEncrypted,
        },
      };

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
