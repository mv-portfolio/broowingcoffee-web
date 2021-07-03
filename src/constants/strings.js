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

const ASSESSMENT_INFORMATION = ({firstname, lastname}) => ({
  firstname: {
    text: firstname || '',
  },
  lastname: {
    text: lastname || '',
  },
});

const ASSESSMENT_ACCOUNT = ({username, email, password, confirmPassword}) => ({
  username: {
    text: username || '',
  },
  email: {
    text: email || '',
  },
  password: {
    text: password || '',
    strength: 0,
  },
  confirmPassword: {
    text: confirmPassword || '',
    isMatched: false,
    isEncrypted: false,
  },
});

export {
  //function
  ACTION_TYPE,
  //plain obj
  USER_FIELDS,
  SIGNIN_FIELDS,
  ASSESSMENT_INFORMATION,
  ASSESSMENT_ACCOUNT,
  ERROR_FIELDS,
};
