import {replace} from 'connected-react-router';
import {ACTION_TYPE} from 'constants/strings';
import {CLEAR_LOADING, SET_ERROR, SET_LOADING} from 'ducks/actions';
import serverConfig from 'ducks/serverConfig';
import {timeout} from 'network/api/server';
import {server} from 'network/service';
import {call, put, takeLatest, delay} from 'redux-saga/effects';

function* resetPasswordWorker(state) {
  try {
    const config = yield serverConfig();
    yield call(server.push, '/reset-password-encoder', state, {
      ...config,
      timeout: timeout(7),
    });
    yield put(
      SET_LOADING({
        status: false,
        message:
          'We already sent an email to the email address you provide, Thank you.',
      }),
    );
    console.log('RESET-PASSWORD-RESOLVED');
  } catch (err) {
    console.log('RESET-PASSWORD-REJECT');
    yield put(SET_ERROR({forgotPassword: err}));
    yield put(CLEAR_LOADING());
  } finally {
    yield delay(4000);
    yield put(CLEAR_LOADING());
    yield put(replace('/'));
  }
}

export default function* rootForgotPasswordSaga() {
  yield takeLatest(ACTION_TYPE('FORGOT-PASSWORD').SET, resetPasswordWorker);
}
