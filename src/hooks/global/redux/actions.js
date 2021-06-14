import {ACTION} from 'constants/string';

//api request
const REQUEST_SIGNIN = () => ({
  type: ACTION().SIGNIN,
});
const REQUEST_SIGNOUT = () => ({
  type: ACTION().SIGNOUT,
});

const REQUEST_APP_AUTH = () => ({
  type: ACTION().APP_AUTH,
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
  REQUEST_SIGNIN,
  REQUEST_SIGNOUT,
  REQUEST_APP_AUTH,
  SET_APP_AUTH,
  CLEAR_APP_AUTH,
  SET_ERROR,
  CLEAR_ERROR,
  PEEK_USERS,
  CLEAR_USERS,
  SET_USERS,
  SET_USER,
  CLEAR_USER,
  PEEK_PRODUCTS,
  SET_PRODUCTS,
  PUSH_PRODUCT,
  POP_PRODUCT,
};
