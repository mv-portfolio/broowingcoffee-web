import {isTypeof} from 'utils/checker';

const assessAccInitState = {
  username: {
    text: '',
  },
  email: {
    text: '',
  },
  privacyPolicy: false,
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

    case 'set-terms-and-conditions':
      return {
        ...state,
        privacyPolicy: action.privacyPolicy,
      };

    default:
      return state;
  }
}
