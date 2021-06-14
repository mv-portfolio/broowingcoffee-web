import rootUsersSaga from './users';
import rootProductsSaga from './products';
import rootAuthSaga from './auth';

import {all} from 'redux-saga/effects';

export default function* rootSagas() {
  yield all([
    rootUsersSaga(),
    rootProductsSaga(),
    rootAuthSaga(),
  ]);
}
