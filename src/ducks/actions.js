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
  report,
  discount,
  productBase,
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
  report,
  discount,
  productBase,
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
const PUSH_PRODUCT = ({product}) => ({
  type: ACTION_TYPE('PRODUCTS').PUSH,
  product,
});
const PUSH_PRODUCT_REQ = ({product}) => ({
  type: ACTION_TYPE('PRODUCTS-REQ').PUSH,
  product,
});
const SET_INDEX_PRODUCTS = ({product}) => ({
  type: ACTION_TYPE('PRODUCTS').SET_INDEX,
  product,
});
const SET_INDEX_PRODUCTS_REQ = ({product}) => ({
  type: ACTION_TYPE('PRODUCTS-REQ').SET_INDEX,
  product,
});
const SET_PRODUCTS = ({products}) => ({
  type: ACTION_TYPE('PRODUCTS').SET,
  products,
});
const POP_PRODUCT = ({product}) => ({
  type: ACTION_TYPE('PRODUCTS').POP,
  product,
});

//product base
const PEEK_PRODUCT_BASE = () => ({
  type: ACTION_TYPE('PRODUCT-BASE').PEEK,
});
const SET_PRODUCT_BASE = ({bases}) => ({
  type: ACTION_TYPE('PRODUCT-BASE').SET,
  bases,
});
const PUSH_PRODUCT_BASE_REQ = ({base}) => ({
  type: ACTION_TYPE('PRODUCT-BASE-REQ').PUSH,
  base,
});
const PUSH_PRODUCT_BASE = ({base}) => ({
  type: ACTION_TYPE('PRODUCT-BASE').PUSH,
  base,
});
const POP_PRODUCT_BASE = ({base}) => ({
  type: ACTION_TYPE('PRODUCT-BASE').POP,
  base,
});

//inventory items
const PEEK_INVENTORY = () => ({
  type: ACTION_TYPE('INVENTORY').PEEK,
});
const PUSH_INVENTORY = ({item}) => ({
  type: ACTION_TYPE('INVENTORY').PUSH,
  item,
});
const PUSH_INVENTORY_REQ = ({item}) => ({
  type: ACTION_TYPE('INVENTORY-REQ').PUSH,
  item,
});
const SET_INVENTORY = ({items}) => ({
  type: ACTION_TYPE('INVENTORY').SET,
  items,
});
const SET_INDEX_INVENTORY = ({item}) => ({
  type: ACTION_TYPE('INVENTORY').SET_INDEX,
  item,
});
const SET_INDEX_INVENTORY_REQ = ({item}) => ({
  type: ACTION_TYPE('INVENTORY-REQ').SET_INDEX,
  item,
});
const SET_RESTOCK_INVENTORY = ({item}) => ({
  type: ACTION_TYPE('INVENTORY-RESTOCK').SET_INDEX,
  item,
});
const SET_RESTOCK_INVENTORY_REQ = ({item}) => ({
  type: ACTION_TYPE('INVENTORY-RESTOCK-REQ').SET_INDEX,
  item,
});
const POP_INVENTORY = ({item}) => ({
  type: ACTION_TYPE('INVENTORY').POP,
  item,
});

//discounts
const PEEK_DISCOUNTS = () => ({
  type: ACTION_TYPE('DISCOUNTS').PEEK,
});
const PUSH_DISCOUNT = ({discount}) => ({
  type: ACTION_TYPE('DISCOUNTS').PUSH,
  discount,
});
const PUSH_DISCOUNT_REQ = ({discount}) => ({
  type: ACTION_TYPE('DISCOUNTS-REQ').PUSH,
  discount,
});
const SET_INDEX_DISCOUNTS = ({discount}) => ({
  type: ACTION_TYPE('DISCOUNTS').SET_INDEX,
  discount,
});
const SET_INDEX_DISCOUNTS_REQ = ({discount}) => ({
  type: ACTION_TYPE('DISCOUNTS-REQ').SET_INDEX,
  discount,
});
const SET_DISCOUNTS = ({discounts}) => ({
  type: ACTION_TYPE('DISCOUNTS').SET,
  discounts,
});
const POP_DISCOUNT = ({discount}) => ({
  type: ACTION_TYPE('DISCOUNTS').POP,
  discount,
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
const POP_PURCHASING_PRODUCT = ({purchasingProduct}) => ({
  type: ACTION_TYPE('PURCHASING-PRODUCTS').POP,
  purchasingProduct,
});
const CLEAR_PURCHASING_PRODUCTS = () => ({
  type: ACTION_TYPE('PURCHASING-PRODUCTS').CLEAR,
});

//transactions
const PEEK_TRANSACTIONS = ({date}) => ({
  type: ACTION_TYPE('TRANSACTIONS').PEEK,
  date,
});
const SET_TRANSACTIONS = ({data, topList, manipulatedData}) => ({
  type: ACTION_TYPE('TRANSACTIONS').SET,
  data,
  topList,
  manipulatedData,
});
const PUSH_TRANSACTIONS = ({transaction}) => ({
  type: ACTION_TYPE('TRANSACTIONS').PUSH,
  transaction,
});

//reports
const PEEK_REPORTS = ({filter}) => ({
  type: ACTION_TYPE('REPORTS').PEEK,
  filter,
});
const PUSH_REPORT = ({transactionHistory, otherHistory}) => ({
  type: ACTION_TYPE('REPORTS').PUSH,
  transactionHistory,
  otherHistory,
});
const SET_REPORTS = ({transactionHistories, otherHistories}) => ({
  type: ACTION_TYPE('REPORTS').SET,
  transactionHistories,
  otherHistories,
});
const CLEAR_REPORTS = () => ({
  type: ACTION_TYPE('REPORTS').CLEAR,
});

const RESET_SESSION = () => ({
  type: ACTION_TYPE('RESET-SESSION').POP,
});

const REPORT_BUG = ({title, issue, from}) => ({
  type: ACTION_TYPE('REPORT-BUG').PUSH,
  from,
  title,
  issue,
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
  SET_INDEX_PRODUCTS_REQ,
  PUSH_PRODUCT_REQ,
  //product base
  PEEK_PRODUCT_BASE,
  SET_PRODUCT_BASE,
  PUSH_PRODUCT_BASE_REQ,
  PUSH_PRODUCT_BASE,
  POP_PRODUCT_BASE,
  //inventory items
  PEEK_INVENTORY,
  PUSH_INVENTORY,
  PUSH_INVENTORY_REQ,
  SET_INVENTORY,
  SET_INDEX_INVENTORY,
  SET_INDEX_INVENTORY_REQ,
  SET_RESTOCK_INVENTORY,
  SET_RESTOCK_INVENTORY_REQ,
  POP_INVENTORY,
  //discounts
  PEEK_DISCOUNTS,
  PUSH_DISCOUNT,
  PUSH_DISCOUNT_REQ,
  SET_INDEX_DISCOUNTS,
  SET_INDEX_DISCOUNTS_REQ,
  SET_DISCOUNTS,
  POP_DISCOUNT,
  //purchasing-products
  SET_PURCHASING_PRODUCTS,
  SET_INDEX_PURCHASING_PRODUCT,
  PUSH_PURCHASING_PRODUCT,
  POP_PURCHASING_PRODUCT,
  CLEAR_PURCHASING_PRODUCTS,
  //transactions
  PEEK_TRANSACTIONS,
  SET_TRANSACTIONS,
  PUSH_TRANSACTIONS,
  //reports
  PEEK_REPORTS,
  PUSH_REPORT,
  SET_REPORTS,
  CLEAR_REPORTS,
  //reset-session
  RESET_SESSION,
  //report-bug
  REPORT_BUG,
};
