import rootUsersSaga from './users';
import rootProductsSaga from './products';
import rootAuthSaga from './auth';
import rootAssessmentSaga from './assessment';
import rootSignInSaga from './signin';
import rootForgotPasswordSaga from './forgotPassword';
import rootTransactionSaga from './transaction';
import rootInventorSaga from './inventory';
import rootResetSessionSaga from './resetSession';

import {all} from 'redux-saga/effects';

export default function* rootSagas() {
  yield all([
    rootUsersSaga(),
    rootProductsSaga(),
    rootAuthSaga(),
    rootAssessmentSaga(),
    rootSignInSaga(),
    rootForgotPasswordSaga(),
    rootTransactionSaga(),
    rootInventorSaga(),
    rootResetSessionSaga(),
  ]);
}
