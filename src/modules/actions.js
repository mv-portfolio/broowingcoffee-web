import {ACTION_TYPE} from 'constants/strings';

//authentication
const APP_AUTH = () => ({
  type: ACTION_TYPE('APP').AUTH,
});
const PEEK_AUTH = () => ({
  type: ACTION_TYPE('AUTH').PEEK,
});
const SET_AUTH = ({authenticated, primary_auth_token, secondary_auth_token}) => ({
  type: ACTION_TYPE('AUTH').SET,
  authenticated,
  primary_auth_token,
  secondary_auth_token,
});
const CLEAR_AUTH = () => ({
  type: ACTION_TYPE('AUTH').CLEAR,
});

//assessment
const ASSESSMENT_AUTH = () => ({
  type: ACTION_TYPE('ASSESSMENT').AUTH,
});
const SET_ASSESSMENT = ({data}) => ({
  type: ACTION_TYPE('ASSESSMENT').SET,
  data,
});
const CLEAR_ASSESSMENT = () => ({
  type: ACTION_TYPE('ASSESSMENT').CLEAR,
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

//loading
const SET_LOADING = ({status, message}) => ({
  type: ACTION_TYPE('LOADING').SET,
  status,
  message,
});
const CLEAR_LOADING = () => ({
  type: ACTION_TYPE('LOADING').CLEAR,
});

const SET_FORGOTPASSWOROD = ({email}) => ({
  type: ACTION_TYPE('FORGOT-PASSWORD').SET,
  email,
});
const CLEAR_FORGOTPASSWORD = () => ({
  type: ACTION_TYPE('FORGOT-PASSWORD').CLEAR,
});

//error
const SET_ERROR = ({
  page,
  auth,
  signin,
  server,
  request,
  forgotPassword,
  assessment,
}) => ({
  type: ACTION_TYPE('ERROR').SET,
  page,
  auth,
  signin,
  server,
  request,
  forgotPassword,
  assessment,
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
const SET_USER = ({_id, firstname, lastname, username, email, isAssessed}) => ({
  type: ACTION_TYPE('USER').SET,
  _id,
  firstname,
  lastname,
  username,
  email,
  isAssessed,
});
const CLEAR_USER = () => ({
  type: ACTION_TYPE('USER').CLEAR,
});

//products hooks
const PEEK_PRODUCTS = () => ({
  type: ACTION_TYPE('PRODUCTS').PEEK,
});
const SET_PRODUCTS = ({main, addons}) => ({
  type: ACTION_TYPE('PRODUCTS').SET,
  main,
  addons,
});
const PUSH_PRODUCT = ({mainProduct, addonProduct}) => ({
  type: ACTION_TYPE('PRODUCTS').PUSH,
  mainProduct,
  addonProduct,
});
const SET_INDEX_PRODUCTS = ({mainId, addonId, payload}) => ({
  type: ACTION_TYPE('PRODUCTS').SET_INDEX,
  mainId,
  addonId,
  payload,
});
const POP_PRODUCT = ({mainId, addonId}) => ({
  type: ACTION_TYPE('PRODUCTS').POP,
  mainId,
  addonId,
});

//purchasing products
const SET_PURCHASING_PRODUCTS = ({purchasingProducts}) => ({
  type: ACTION_TYPE('PURCHASING-PRODUCTS').SET,
  purchasingProducts,
});
const SET_INDEX_PURCHASING_PRODUCT = ({purchasingProduct}) => ({
  type: ACTION_TYPE('PURCHASING-PRODUCT').SET_INDEX,
  purchasingProduct,
});
const PUSH_PURCHASING_PRODUCT = ({purchasingProduct}) => ({
  type: ACTION_TYPE('PURCHASING-PRODUCT').PUSH,
  purchasingProduct,
});
const POP_PURCHASING_PRODUCT = ({purchasingProductId}) => ({
  type: ACTION_TYPE('PURCHASING-PRODUCT').POP,
  purchasingProductId,
});

export {
  //auth
  APP_AUTH,
  PEEK_AUTH,
  SET_AUTH,
  CLEAR_AUTH,
  //loading
  SET_LOADING,
  CLEAR_LOADING,
  //sigin
  SET_SIGNIN,
  CLEAR_SIGNIN,
  //assessnent
  ASSESSMENT_AUTH,
  SET_ASSESSMENT,
  CLEAR_ASSESSMENT,
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
  SET_INDEX_PRODUCTS,
  PUSH_PRODUCT,
  POP_PRODUCT,
  //purchasing-products
  SET_PURCHASING_PRODUCTS,
  SET_INDEX_PURCHASING_PRODUCT,
  PUSH_PURCHASING_PRODUCT,
  POP_PURCHASING_PRODUCT,
};
