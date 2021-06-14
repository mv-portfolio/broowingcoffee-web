const ACTION = type => ({
  //hooks action
  PUSH: `PUSH_${type}`,
  POP: `POP_${type}`,
  PEEK: `PEEK_${type}`,
  SET: `SET_${type}`,
  CLEAR: `CLEAR_${type}`,
  //action only
  SIGNIN: `SIGNIN`,
  SIGNOUT: `SIGNOUT`,
});

const USER_FIELDS = {
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  primary_auth_token: '',
  secondary_auth_token: '',
};

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

export {
  ACTION,
  USER_FIELDS,
  SIGNIN_FIELDS,
  ASSESSMENT_INFORMATION,
  ASSESSMENT_ACCOUNT,
};
