import user from './user';
import users from './users';
import products from './products';
import auth from './auth';
import session from './session';
import loading from './loading';
import error from './error';
import assessment from './assessment';
import forgotPassword from './forgotPassword';

import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

export default function rootReducer(history) {
  return combineReducers({
    user,
    auth,
    users,
    products,
    session,
    error,
    loading,
    assessment,
    forgotPassword,
    router: connectRouter(history),
  });
}
