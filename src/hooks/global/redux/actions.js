import {ACTION} from 'constants/strings';

//api request
const REQUEST_APP_AUTH = () => ({
  type: ACTION().APP_AUTH,
});

//loading
const SET_LOADING = data => ({
  type: ACTION('LOADING').SET,
  ...data,
});
const CLEAR_LOADING = () => ({
  type: ACTION('LOADING').CLEAR,
});

//session
const SET_SESSION = data => ({
  type: ACTION('SESSION').SET,
  ...data,
});
const CLEAR_SESSION = () => ({
  type: ACTION('SESSION').CLEAR,
});

//assessment
const ASSESSMENT_REQUEST = () => ({
  type: ACTION().ASSESS_AUTH,
});
const ASSESSMENT_SET = data => ({
  type: ACTION('ASSESSMENT').SET,
  ...data,
});
const ASSESSMENT_CLEAR = () => ({
  type: ACTION('ASSESSMENT').CLEAR,
});

//authentication
const PEEK_APP_AUTH = () => ({
  type: ACTION('AUTH').PEEK,
});
const SET_APP_AUTH = data => ({
  type: ACTION('AUTH').SET,
  ...data,
});
const CLEAR_APP_AUTH = () => ({
  type: ACTION('AUTH').CLEAR,
});

//error
const SET_ERROR = data => ({
  type: ACTION('ERROR').SET,
  ...data,
});
const CLEAR_ERROR = () => ({
  type: ACTION('ERROR').CLEAR,
});

//users hooks
const PEEK_USERS = () => ({
  type: ACTION('USERS').PEEK,
});
const SET_USERS = data => ({
  type: ACTION('USERS').SET,
  users: data,
});
const CLEAR_USERS = () => ({
  type: ACTION('USERS').CLEAR,
});

//user hooks
const SET_USER = user => ({
  type: ACTION('USER').SET,
  ...user,
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
