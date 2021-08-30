const assessAccInitState = {
  username: {
    text: '',
  },
  email: {
    text: '',
  },
  currentPassword: {
    text: '',
  },
  newPassword: {
    text: '',
    strength: '',
  },
  confirmNewPassword: {
    text: '',
    isMatched: '',
    isEncrypted: '',
  },
};
export default function assessAcc(state = assessAccInitState, action) {
  switch (action.type) {
    case 'set':
      return {
        username: {
          text: action.username.text || state.username.text,
        },
        email: {
          text: action.email.text || state.email.text,
        },
        currentPassword: {
          text: action.currentPassword.text || state.currentPassword.text,
        },
        newPassword: {
          text: action.newPassword.text || state.newPassword.text,
          strength: action.newPassword.strength || state.newPassword.strength,
        },
        confirmNewPassword: {
          text: action.confirmNewPassword.text || state.confirmNewPassword.text,
          isMatched: action.confirmNewPassword.isMatched || state.confirmNewPassword.isMatched,
          isEncrypted: action.confirmNewPassword.isEncrypted || state.confirmNewPassword.isEncrypted,
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

    case 'set-current-password':
      return {
        ...state,
        currentPassword: {
          text: action.text,
          isEncrypted: action.isEncrypted,
        },
      };

    case 'set-new-password':
      return {
        ...state,
        newPassword: {
          text: action.text,
          strength: action.strength,
        },
        confirmNewPassword: {
          ...state.confirmNewPassword,
          isMatched: action.isMatched,
        },
      };

    case 'set-confirm-new-password':
      return {
        ...state,
        confirmNewPassword: {
          text: action.text,
          isMatched: action.isMatched,
          isEncrypted: action.isEncrypted,
        },
      };

    default:
      return state;
  }
}
