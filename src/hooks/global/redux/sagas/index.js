import rootUsersSaga from './users';
import rootProductsSaga from './products';

import {all} from 'redux-saga/effects';

export default function* rootSagas() {
  yield all([rootUsersSaga(), rootProductsSaga()]);
}
