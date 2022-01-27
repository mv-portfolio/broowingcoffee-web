export const signinInitState = {
  username: {
    text: '',
  },
  password: {
    text: '',
    isEncrypted: false,
  },
};

export default function login(state = signinInitState, action) {
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

    case 'clear':
      return signinInitState;

    default:
      return state;
  }
}
