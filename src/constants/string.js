const SIGNIN_FIELDS = {
  username: {
    text: '',
  },
  password: {
    text: '',
    isEncrypted: false,
  },
};

const ASSESSMENT_INFORMATION = {
  firstname: {
    text: '',
  },
  lastname: {
    text: '',
  },
};

const ASSESSMENT_ACCOUNT = {
  username: {
    text: '',
  },
  email: {
    text: '',
  },
  password: {
    text: '',
    strength: 0,
  },
  confirmPassword: {
    text: '',
    isMatched: false,
    isEncrypted: false,
  },
};

export {SIGNIN_FIELDS, ASSESSMENT_INFORMATION, ASSESSMENT_ACCOUNT};
