import {ACTION} from 'constants/strings';

//api request
const REQUEST_APP_AUTH = () => ({
  type: ACTION().APP_AUTH,
});

//loading
const SET_LOADING = ({status}) => ({
  type: ACTION('LOADING').SET,
  status,
});
const CLEAR_LOADING = () => ({
  type: ACTION('LOADING').CLEAR,
});

//session
const SET_SESSION = ({username, password}) => ({
  type: ACTION('SESSION').SET,
  username,
  password,
});
const CLEAR_SESSION = () => ({
  type: ACTION('SESSION').CLEAR,
});

//assessment
const ASSESSMENT_REQUEST = () => ({
  type: ACTION().ASSESS_AUTH,
});
const ASSESSMENT_SET = ({isAssessed, token}) => ({
  type: ACTION('ASSESSMENT').SET,
  isAssessed,
  token,
});
const ASSESSMENT_CLEAR = () => ({
  type: ACTION('ASSESSMENT').CLEAR,
});

//authentication
const PEEK_APP_AUTH = () => ({
  type: ACTION('AUTH').PEEK,
});
const SET_APP_AUTH = ({
  authenticated,
  primary_auth_token,
  secondary_auth_token,
}) => ({
  type: ACTION('AUTH').SET,
  authenticated,
  primary_auth_token,
  secondary_auth_token,
});
const CLEAR_APP_AUTH = () => ({
  type: ACTION('AUTH').CLEAR,
});

//error
const SET_ERROR = ({errorCode, name, message}) => ({
  type: ACTION('ERROR').SET,
  errorCode,
  name,
  message,
});
const CLEAR_ERROR = () => ({
  type: ACTION('ERROR').CLEAR,
});

//users hooks
const PEEK_USERS = () => ({
  type: ACTION('USERS').PEEK,
});
const SET_USERS = ({user}) => ({
  type: ACTION('USERS').SET,
  user,
});
const CLEAR_USERS = () => ({
  type: ACTION('USERS').CLEAR,
});

//user hooks
const SET_USER = ({firstname, lastname, username, email}) => ({
  type: ACTION('USER').SET,
  firstname,
  lastname,
  username,
  email,
});
const CLEAR_USER = () => ({
  type: ACTION('USER').CLEAR,
});

//products hooks
const PEEK_PRODUCTS = () => ({
  type: ACTION('PRODUCTS').PEEK,
});
const SET_PRODUCTS = products => ({
  type: ACTION('PRODUCTS').SET,
  products: products,
});
const PUSH_PRODUCT = product => ({
  type: ACTION('PRODUCT').PUSH,
  product: product,
});
const POP_PRODUCT = product => ({
  type: ACTION('PRODUCT').POP,
  product: product,
});

export {
  //auth
  REQUEST_APP_AUTH,
  PEEK_APP_AUTH,
  SET_APP_AUTH,
  CLEAR_APP_AUTH,
  //loading
  SET_LOADING,
  CLEAR_LOADING,
  //session
  SET_SESSION,
  CLEAR_SESSION,
  //assessnent
  ASSESSMENT_REQUEST,
  ASSESSMENT_SET,
  ASSESSMENT_CLEAR,
  //error
  SET_ERROR,
  CLEAR_ERROR,
  //users
  PEEK_USERS,
  CLEAR_USERS,
  SET_USERS,
  //user
  SET_USER,
  CLEAR_USER,
  //products
  PEEK_PRODUCTS,
  SET_PRODUCTS,
  PUSH_PRODUCT,
  POP_PRODUCT,
};
