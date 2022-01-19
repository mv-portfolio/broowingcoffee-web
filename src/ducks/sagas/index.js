import rootUsersSaga from './users';
import rootProductsSaga from './products';
import rootAuthSaga from './auth';
import rootAssessmentSaga from './assessment';
import rootSignInSaga from './signin';
import rootForgotPasswordSaga from './forgotPassword';
import rootTransactionSaga from './transactions';
import rootInventorSaga from './inventory';
import rootResetSessionSaga from './resetSession';
import rootReportSaga from './reports';
import rootReportBugSaga from './reportBug';
import rootDiscountsSaga from './discounts';

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
    rootReportSaga(),
    rootReportBugSaga(),
    rootDiscountsSaga(),
  ]);
}
