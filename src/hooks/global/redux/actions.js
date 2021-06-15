import {ACTION} from 'constants/string';

//api request
const REQUEST_APP_AUTH = () => ({
  type: ACTION().APP_AUTH,
});

//signin
const SET_SESSION = signin => ({
  type: ACTION('SESSION').SET,
  signin: signin,
});
//signout
const CLEAR_SESSION = () => ({
  type: ACTION('SESSION').CLEAR,
});

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
const SET_ERROR = error => ({
  type: ACTION('ERROR').SET,
  ...error,
});
const CLEAR_ERROR = () => ({
  type: ACTION('ERROR').CLEAR,
});

//users hooks
const PEEK_USERS = () => ({
  type: ACTION('USERS').PEEK,
});
const SET_USERS = users => ({
  type: ACTION('USERS').SET,
  users: users,
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
  //session
  SET_SESSION,
  CLEAR_SESSION,
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
