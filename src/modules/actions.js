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
  transaction,
  product,
  inventory,
}) => ({
  type: ACTION_TYPE('ERROR').SET,
  page,
  auth,
  signin,
  server,
  request,
  forgotPassword,
  assessment,
  transaction,
  product,
  inventory,
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

//inventory items
const PEEK_INVENTORY = () => ({
  type: ACTION_TYPE('INVENTORY').PEEK,
});
const PUSH_INVENTORY = ({item}) => ({
  type: ACTION_TYPE('INVENTORY').PUSH,
  item,
});
const SET_INVENTORY = ({items}) => ({
  type: ACTION_TYPE('INVENTORY').SET,
  items,
});
const SET_INDEX_INVENTORY = ({itemId, payload}) => ({
  type: ACTION_TYPE('INVENTORY').SET_INDEX,
  itemId,
  payload,
});
const POP_INVENTORY = ({itemId}) => ({
  type: ACTION_TYPE('INVENTORY').POP,
  itemId,
});
const POP_INVENTORY_REQ = ({itemId}) => ({
  type: ACTION_TYPE('INVENTORY-REQ').POP,
  itemId,
});

//purchasing products
const SET_PURCHASING_PRODUCTS = ({purchasingProducts}) => ({
  type: ACTION_TYPE('PURCHASING-PRODUCTS').SET,
  purchasingProducts,
});
const SET_INDEX_PURCHASING_PRODUCT = ({purchasingProduct}) => ({
  type: ACTION_TYPE('PURCHASING-PRODUCTS').SET_INDEX,
  purchasingProduct,
});
const PUSH_PURCHASING_PRODUCT = ({purchasingProduct}) => ({
  type: ACTION_TYPE('PURCHASING-PRODUCTS').PUSH,
  purchasingProduct,
});
const POP_PURCHASING_PRODUCT = ({purchasingProductId}) => ({
  type: ACTION_TYPE('PURCHASING-PRODUCTS').POP,
  purchasingProductId,
});
const CLEAR_PURCHASING_PRODUCTS = () => ({
  type: ACTION_TYPE('PURCHASING-PRODUCTS').CLEAR,
});

const PEEK_TRANSACTIONS = () => ({
  type: ACTION_TYPE('TRANSACTIONS').PEEK,
});
const PUSH_TRANSACTIONS = ({transaction}) => ({
  type: ACTION_TYPE('TRANSACTIONS').PUSH,
  transaction,
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
  //inventory items
  PEEK_INVENTORY,
  PUSH_INVENTORY,
  SET_INVENTORY,
  SET_INDEX_INVENTORY,
  POP_INVENTORY,
  POP_INVENTORY_REQ,
  //purchasing-products
  SET_PURCHASING_PRODUCTS,
  SET_INDEX_PURCHASING_PRODUCT,
  PUSH_PURCHASING_PRODUCT,
  POP_PURCHASING_PRODUCT,
  CLEAR_PURCHASING_PRODUCTS,
  //transactions
  PEEK_TRANSACTIONS,
  PUSH_TRANSACTIONS,
};
