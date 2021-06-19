import {push} from 'connected-react-router';
import {
  peekLocalStorage,
  popLocalStorage,
  pushLocalStorage,
} from 'hooks/global/storage';
import {getRequestServer, postRequestServer} from 'network/service';
import {SET_APP_AUTH, SET_ERROR, SET_LOADING} from '../actions';

const {ACTION} = require('constants/strings');
const {takeEvery, select, call, put, take} = require('redux-saga/effects');

function* serverConfig() {
  const auth = yield select(state => state.auth);
  return {
    headers: {
      'primary-auth-token': auth.primary_auth_token,
      'secondary-auth-token': auth.secondary_auth_token,
    },
    auth,
  };
}

function* authentication() {
  try {
    //INITIALIZATION OF APP-AUTH
    const appAuth = yield call(getRequestServer, '/app-authentication');
    if (!appAuth.data.status) {
      console.error('Server Failed to connect');
      return yield put(
        SET_ERROR({
          name: 'Server Maintenance',
          message:
            'Sorry for inconvenient, we temporarily down the server and we will be back soon',
        }),
      );
    }

    //save the PAT from globalState
    yield put(
      SET_APP_AUTH({
        primary_auth_token: appAuth.data.res.primary_auth_token,
      }),
    );

    //check if the SAT is null
    const secondary_auth_token = yield peekLocalStorage('sat');
    if (!secondary_auth_token) {
      return yield put(
        SET_APP_AUTH({
          authenticated: false,
        }),
      );
    }

    //save existing SAT from globalState
    yield put(
      SET_APP_AUTH({
        secondary_auth_token: secondary_auth_token,
      }),
    );

    //INITIALIZATION OF USER-AUTH
    //check if the SAT of user is still valid or if the user is still authenticated
    const config = yield serverConfig();
    const userAuth = yield call(
      getRequestServer,
      '/signin-authentication-decoder',
      config,
    );

    //check if the user authentication is invalid
    if (!userAuth.data.status) {
      yield popLocalStorage('sat');
      return yield put(
        SET_APP_AUTH({
          authenticated: false,
          secondary_auth_token: undefined,
        }),
      );
    }

    //check if the authenticated user is not assessed yet
    if (!userAuth.data.res.user._id_config.isAssessed) {
      yield put(
        push(`/assessment/information/${config.auth.secondary_auth_token}`),
      );
    }

    yield put(
      SET_APP_AUTH({
        authenticated: true,
        secondary_auth_token: config.auth.secondary_auth_token,
      }),
    );
  } catch (err) {
    console.log('Error[app-auth]:', err);
    yield put(
      SET_ERROR({
        errorCode: err.code,
        name: err.message,
        message: err,
      }),
    );
  }
}

function* signInAuthentication() {
  try {
    //INITIALIZATION of SESSION-AUTH
    const session = yield select(state => state.session);
    const signInAuth = yield call(
      postRequestServer,
      '/signin-authentication-encoder',
      {
        username: session.username,
        password: session.password,
      },
      yield serverConfig(),
    );

    //check if there is an error on SignIn Request
    if (!signInAuth.data.status) {
      //if the data.err is undefined means the connection from the server is down
      if (!signInAuth.data.err) {
        return yield put(
          SET_ERROR({
            name: 'Server Maintenance',
            message:
              'Sorry for inconvenient, we temporarily down the server and we will be back soon',
          }),
        );
      }

      //set loading to false and return the error message
      yield put(SET_LOADING({status: false}));
      return yield put(
        SET_ERROR({
          message: signInAuth.data.err,
        }),
      );
    }

    //stored the new SAT on localstorage and save from the globalState
    yield pushLocalStorage('sat', signInAuth.data.res.secondary_auth_token);
    yield put(
      SET_APP_AUTH({
        secondary_auth_token: signInAuth.data.res.secondary_auth_token,
      }),
    );

    //redirect the user if the user not yet done on assessment
    if (!signInAuth.data.res.user._id_config.isAssessed) {
      return yield put(
        push(
          `/assessment/information/${signInAuth.data.res.secondary_auth_token}`,
        ),
      );
    }

    yield put(push('/'));
    yield put(SET_APP_AUTH({authenticated: true}));
  } catch (err) {
    console.log('Error[user-auth]:', err);
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
    /*
      if user start directly in /assessment/ config is become to null
      because /app-auth is not yet initialize to set config thus it
    */
    const config = yield serverConfig();
    const userAuth = yield call(
      getRequestServer,
      '/signin-authentication-decoder',
      config,
    );

    if (!userAuth.data.status) {
      yield put(
        SET_ERROR({
          name: 'Page Not Found',
          message:
            'We are having in trouble, Please be sure the link is exist.',
        }),
      );
      return yield put(push('/'));
    }
  } catch (err) {
    console.log('Error[assess-auth]:', err);
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
  yield takeEvery(ACTION().APP_AUTH, authentication);
  yield takeEvery(ACTION('SESSION').SET, signInAuthentication);
  yield take(ACTION().ASSESS_AUTH);
  yield call(assessmentAuthentication);
}
