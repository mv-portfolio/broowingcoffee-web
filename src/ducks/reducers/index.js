import user from './user';
import users from './users';
import auth from './auth';
import signin from './signin';
import loading from './loading';
import error from './error';
import assessment from './assessment';
import forgotPassword from './forgotPassword';
import products from './products';
import purchasingProducts from './purchasingProducts';
import transactions from './transactions';
import inventory from './inventory';
import reports from './reports';
import discounts from './discounts';
import productBase from './productBase';

import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

export default function rootReducer(history) {
  return combineReducers({
    user,
    auth,
    users,
    products,
    signin,
    error,
    loading,
    assessment,
    forgotPassword,
    purchasingProducts,
    transactions,
    inventory,
    reports,
    discounts,
    productBase,
    router: connectRouter(history),
  });
}
