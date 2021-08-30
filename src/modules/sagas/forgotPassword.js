import {ACTION_TYPE} from 'constants/strings';
import {CLEAR_LOADING, SET_ERROR} from 'modules/actions';
import {put, takeEvery} from 'redux-saga/effects';

function* resetPasswordWorker() {
  try {
  } catch (err) {
    console.log('RESET-PASSWORD-REJECT:', err);
    yield put(SET_ERROR({forgotPassword: err}));
    yield put(CLEAR_LOADING());
  }
}

export default function* rootForgotPasswordSaga() {
  yield takeEvery(ACTION_TYPE('FORGOT-PASSWORD').SET, resetPasswordWorker);
}
