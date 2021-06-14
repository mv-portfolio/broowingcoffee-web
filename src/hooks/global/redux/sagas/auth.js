import {ACTION} from 'constants/string';
import {peekLocalStorage} from 'hooks/global/storage';
import {getRequestServer} from 'network/service';
import {call, put, takeEvery} from 'redux-saga/effects';
import {SET_ERROR, SET_APP_AUTH} from '../actions';

function* appAuthentication() {
  try {
    const {
      data: {res, err, status},
    } = yield call(getRequestServer, '/app-authentication');
    if (!status) {
      return console.log('ERROR[APP-AUTH]:', err);
    }
    yield put(
      SET_APP_AUTH({
        primary_auth_token: res.primary_auth_token,
      }),
    );

    if (!peekLocalStorage('@sat')) {
    }
  } catch (err) {
    yield put(
      SET_ERROR({
        errorCode: err.code,
        name: err.message,
        message: err,
      }),
    );
  }
}

export default function* rootAuthSaga() {
  yield takeEvery(ACTION().APP_AUTH, appAuthentication);
}
