import {put, takeLatest} from 'redux-saga/effects';
import {ACTION_TYPE} from 'constants/strings';
import {
  CLEAR_AUTH,
  CLEAR_LOADING,
  CLEAR_ASSESSMENT,
  CLEAR_ERROR,
  CLEAR_FORGOTPASSWORD,
  CLEAR_PURCHASING_PRODUCTS,
  CLEAR_SIGNIN,
  CLEAR_USER,
  CLEAR_USERS,
  CLEAR_REPORTS,
} from 'ducks/actions';
import {replace} from 'connected-react-router';

function* resetWorker() {
  yield put(CLEAR_AUTH());
  yield put(CLEAR_LOADING());
  yield put(CLEAR_ASSESSMENT());
  yield put(CLEAR_ERROR());
  yield put(CLEAR_FORGOTPASSWORD());
  yield put(CLEAR_SIGNIN());
  yield put(CLEAR_USER());
  yield put(CLEAR_USERS());
  yield put(CLEAR_REPORTS());
  yield put(replace('/'));
  console.log('RESET-SESSION RESOLVE');
}

export default function* rootResetSessionSaga() {
  yield takeLatest(ACTION_TYPE('RESET-SESSION').POP, resetWorker);
}
