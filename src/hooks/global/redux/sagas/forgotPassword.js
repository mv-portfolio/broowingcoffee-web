import {push} from 'connected-react-router';
import {ACTION_TYPE} from 'constants/strings';
import {postRequestServer} from 'network/service';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {SET_ERROR} from '../actions';

function* requestResetPassword() {
  try {
    console.log('FORGOT-PASSWORD');
    //   const forgotPassword = yield select(state => state.forgotPassword);
    //   const forgotPassword = yield call(postRequestServer, '/reset-password');
  } catch (err) {
    yield SET_ERROR({
      errorCode: err.code,
      name: err.message,
      message: err,
    });
    yield put(push('/'));
  }
}

export default function* rootForgotPasswordSaga() {
  yield takeEvery(ACTION_TYPE('FORGOT-PASSWORD').SET, requestResetPassword);
}
