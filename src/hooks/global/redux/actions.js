import {ACTION_TYPE} from 'constants/strings';

//api request
const REQUEST_APP_AUTH = () => ({
  type: ACTION_TYPE().APP_AUTH,
});

//loading
const SET_LOADING = ({status, message}) => ({
  type: ACTION_TYPE('LOADING').SET,
  status,
  message,
});
const CLEAR_LOADING = () => ({
  type: ACTION_TYPE('LOADING').CLEAR,
});

//sigin
const SET_SIGNIN = ({username, password}) => ({
  type: ACTION_TYPE('SIGNIN').SET,
  username,
  password,
});
const CLEAR_SIGNIN = () => ({
  type: ACTION_TYPE('SIGNIN').CLEAR,
});

//assessment
const ASSESSMENT_REQUEST = () => ({
  type: ACTION_TYPE().ASSESS_AUTH,
});
const ASSESSMENT_SET = ({isAssessed, token}) => ({
  type: ACTION_TYPE('ASSESSMENT').SET,
  isAssessed,
  token,
});
const ASSESSMENT_CLEAR = () => ({
  type: ACTION_TYPE('ASSESSMENT').CLEAR,
});

//authentication
const PEEK_APP_AUTH = () => ({
  type: ACTION_TYPE('AUTH').PEEK,
});
const SET_APP_AUTH = ({
  authenticated,
  primary_auth_token,
  secondary_auth_token,
}) => ({
  type: ACTION_TYPE('AUTH').SET,
  authenticated,
  primary_auth_token,
  secondary_auth_token,
});
const CLEAR_APP_AUTH = () => ({
  type: ACTION_TYPE('AUTH').CLEAR,
});

const SET_FORGOTPASSWOROD = ({email}) => ({
  type: ACTION_TYPE('FORGOT-PASSWORD').SET,
  email,
});
const CLEAR_FORGOTPASSWORD = () => ({
  type: ACTION_TYPE('FORGOT-PASSWORD').CLEAR,
});

//error
const SET_ERROR = ({errorCode, name, message}) => ({
  type: ACTION_TYPE('ERROR').SET,
  errorCode,
  name,
  message,
});
const CLEAR_ERROR = () => ({
  type: ACTION_TYPE('ERROR').CLEAR,
});

//users hooks
const PEEK_USERS = () => ({
  type: ACTION_TYPE('USERS').PEEK,
});
const SET_USERS = ({user}) => ({
  type: ACTION_TYPE('USERS').SET,
  user,
});
const CLEAR_USERS = () => ({
  type: ACTION_TYPE('USERS').CLEAR,
});

//user hooks
const SET_USER = ({firstname, lastname, username, email}) => ({
  type: ACTION_TYPE('USER').SET,
  firstname,
  lastname,
  username,
  email,
});
const CLEAR_USER = () => ({
  type: ACTION_TYPE('USER').CLEAR,
});

//products hooks
const PEEK_PRODUCTS = () => ({
  type: ACTION_TYPE('PRODUCTS').PEEK,
});
const SET_PRODUCTS = products => ({
  type: ACTION_TYPE('PRODUCTS').SET,
  products: products,
});
const PUSH_PRODUCT = product => ({
  type: ACTION_TYPE('PRODUCT').PUSH,
  product: product,
});
const POP_PRODUCT = product => ({
  type: ACTION_TYPE('PRODUCT').POP,
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
  //sigin
  SET_SIGNIN,
  CLEAR_SIGNIN,
  //assessnent
  ASSESSMENT_REQUEST,
  ASSESSMENT_SET,
  ASSESSMENT_CLEAR,
  //forgot-password,
  SET_FORGOTPASSWOROD,
  CLEAR_FORGOTPASSWORD,
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
