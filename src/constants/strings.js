const ACTION_TYPE = type => ({
  //hooks action
  PUSH: `PUSH_${type}`,
  POP: `POP_${type}`,
  PEEK: `PEEK_${type}`,
  SET: `SET_${type}`,
  CLEAR: `CLEAR_${type}`,
  //api action only
  APP_AUTH: `APP_AUTHENTICATION`,
  ASSESS_AUTH: `ASSESS_AUTH`,
});

const USER_FIELDS = {
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  primary_auth_token: '',
  secondary_auth_token: '',
};

const ERROR_FIELDS = {
  name: '',
  message: '',
}

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
  //function
  ACTION_TYPE,
  //plain obj
  USER_FIELDS,
  SIGNIN_FIELDS,
  ASSESSMENT_INFORMATION,
  ASSESSMENT_ACCOUNT,
  ERROR_FIELDS
};
