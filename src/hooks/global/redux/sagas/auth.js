import {ACTION} from 'constants/strings';
import {
  peekLocalStorage,
  popLocalStorage,
  pushLocalStorage,
} from 'hooks/global/storage';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {getRequestServer, postRequestServer} from 'network/service';
import {SET_ERROR, SET_APP_AUTH, SET_LOADING} from '../actions';
import {push} from 'connected-react-router';

function* serverConfig() {
  const auth = yield select(state => state.auth);
  return {
    headers: {
      'primary-auth-token': auth.primary_auth_token,
      'secondary-auth-token': auth.secondary_auth_token,
    },
  };
}

function* authenticaton() {
  try {
    console.log('APP-AUTHENTICATION');
    //init app-authentication
    const appAuth = yield call(getRequestServer, '/app-authentication');
    if (!appAuth.data.status) {
      console.error('Server Failed to connect, Please check your base-URL');
      return console.log('/app-authentication FAILED:', appAuth.data.err);
    }
    yield put(
      SET_APP_AUTH({
        primary_auth_token: appAuth.data.res.primary_auth_token,
      }),
    );

    //check if there sat is empty
    const secondary_auth_token = yield peekLocalStorage('sat');
    if (!secondary_auth_token) {
      return yield put(
        SET_APP_AUTH({
          authenticated: false,
        }),
      );
    }

    //push sat to auth state
    yield put(
      SET_APP_AUTH({
        secondary_auth_token: secondary_auth_token,
      }),
    );

    //peek auth state & get requeqst if user is authenticated
    const auth = yield select(state => state.auth);
    const userAuth = yield call(
      getRequestServer,
      '/signin-authentication-decoder',
      yield serverConfig(),
    );

    //check user-auth is failed
    if (!userAuth.data.status) {
      yield popLocalStorage('sat');
      return yield put(
        SET_APP_AUTH({
          authenticated: false,
          secondary_auth_token: '',
        }),
      );
    }

    yield put(
      SET_APP_AUTH({
        authenticated: true,
        secondary_auth_token: auth.secondary_auth_token,
      }),
    );

    //check user is not assessed
    if (!userAuth.data.res.user._id_config.isAssessed) {
      return yield put(
        push(`/assessment/information/${auth.secondary_auth_token}`),
      );
    }
  } catch (err) {
    console.log('ERROR [app-auth]:', err);
    yield put(
      SET_ERROR({
        errorCode: err.code,
        name: err.message,
        message: err,
      }),
    );
  }
}

function* signinAuthentication() {
  try {
    console.log('SIGNIN-AUTHENTICATION');
    const session = yield select(state => state.session);
    const {
      data: {status, res, err},
    } = yield call(
      postRequestServer,
      '/signin-authentication-encoder',
      {
        username: session.username,
        password: session.password,
      },
      yield serverConfig(),
    );

    yield put(
      SET_LOADING({
        status: false,
      }),
    );

    if (!status) {
      console.log('SIGN-IN FAILED');
      return yield put(
        SET_ERROR({
          message: err,
        }),
      );
    }

    yield pushLocalStorage('sat', res.secondary_auth_token);
    yield put(
      SET_APP_AUTH({
        authenticated: true,
        secondary_auth_token: res.secondary_auth_token,
      }),
    );

    if (!res.user._id_config.isAssessed) {
      return yield put(
        push(`/assessment/information/${res.secondary_auth_token}`),
      );
    }
  } catch (err) {
    console.log('ERROR [user-auth]:', err);
    yield put(
      SET_ERROR({
        errorCode: err.code,
        name: err.message,
        message: err,
      }),
    );
  }
}

function* assessmentAuthentication() {
  try {
    console.log('ASSESSMENT-AUTHENTICATION');
    // const {
    //   data: {
    //     status, res, err
    //   }
    // } = yield call()
  } catch (err) {
    console.log('ERROR [assessment-auth]:', err);
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
  yield takeEvery(ACTION().APP_AUTH, authenticaton);
  yield takeEvery(ACTION('SESSION').SET, signinAuthentication);
  yield takeEvery(ACTION().ASSESS_AUTH, assessmentAuthentication);
}
