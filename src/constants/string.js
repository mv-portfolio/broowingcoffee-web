const ACTION = {
  //api action
  PUSH: 'PUSH',
  POP: 'POP',
  PEEK: 'PEEK',
  SET: 'SET',
  //normal action
  CREATE: 'CREATE',
  READ: 'READ',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
};

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
