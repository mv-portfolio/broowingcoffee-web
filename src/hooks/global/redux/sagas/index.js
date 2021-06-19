import rootUsersSaga from './users';
import rootProductsSaga from './products';
import rootAuthSaga from './auth';
import rootForgotPasswordSaga from './forgotPassword';

import {all} from 'redux-saga/effects';

export default function* rootSagas() {
  yield all([
    rootUsersSaga(),
    rootProductsSaga(),
    rootAuthSaga(),
    rootForgotPasswordSaga(),
  ]);
}
