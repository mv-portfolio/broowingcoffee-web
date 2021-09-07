//function obj
const ACTION_TYPE = type => ({
  //hooks action (obj)
  PEEK: `PEEK_${type}`,
  PUSH: `PUSH_${type}`,
  POP: `POP_${type}`,
  SET: `SET_${type}`,
  CLEAR: `CLEAR_${type}`,
  //hooksaction (array)
  SET_INDEX: `SET_INDEX_${type}`,
  //api action only
  AUTH: `${type}-AUTHENTICATION`,
});

const ASSESSMENT_INFORMATION = ({firstname, lastname}) => ({
  firstname: {
    text: firstname || '',
  },
  lastname: {
    text: lastname || '',
  },
});

const ASSESSMENT_ACCOUNT = ({
  username,
  email,
  currentPassword,
  newPassword,
  confirmNewPassword,
}) => ({
  username: {
    text: username || '',
  },
  email: {
    text: email || '',
  },
  currentPassword: {
    text: currentPassword || '',
  },
  newPassword: {
    text: newPassword || '',
    strength: 0,
  },
  confirmNewPassword: {
    text: confirmNewPassword || '',
    isMatched: false,
    isEncrypted: false,
  },
});

//plain object
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

export {
  //function
  ACTION_TYPE,
  ASSESSMENT_INFORMATION,
  ASSESSMENT_ACCOUNT,
  //plain obj
  USER_FIELDS,
  SIGNIN_FIELDS,
  ERROR_FIELDS,
};
