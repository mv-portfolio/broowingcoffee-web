import user from './user';
import users from './users';
import products from './products';
import auth from './auth';
import error from './error';

import {combineReducers} from 'redux';

export default combineReducers({
  user,
  auth,
  users,
  products,
  error,
});
