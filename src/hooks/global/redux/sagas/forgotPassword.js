import serverConfig from './serverConfig';
import Time from 'utils/Time';

import {push} from 'connected-react-router';
import {ACTION_TYPE} from 'constants/strings';
import {postRequestServer} from 'network/service';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {CLEAR_LOADING, SET_ERROR, SET_LOADING} from '../actions';

function* requestResetPassword() {
  try {
    console.log('FORGOT-PASSWORD');

    const forgotPassword = yield select(state => state.forgotPassword);
    const requestForgotPassword = yield call(
      postRequestServer,
      '/reset-password',
      {
        email: forgotPassword.email,
      },
      yield serverConfig(),
    );

    if (!requestForgotPassword.data.status) {
      yield put(SET_LOADING({status: false}));
      return yield put(
        SET_ERROR({
          message: 'Please provide a valid Email Address.',
        }),
      );
    }

    yield put(
      SET_LOADING({
        status: false,
        message: 'We already sent the reset verfication link to your email.',
      }),
    );

    yield call(Time.set, 3000);
    yield put(CLEAR_LOADING());
    yield put(push('/'));
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
