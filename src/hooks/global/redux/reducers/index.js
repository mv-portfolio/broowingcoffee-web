import user from './user';
import users from './users';
import products from './products';

import {combineReducers} from 'redux';

export default combineReducers({
  user,
  users,
  products,
});
