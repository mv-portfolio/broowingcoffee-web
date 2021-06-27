import serverConfig from './serverConfig';

import {push, replace} from 'connected-react-router';
import {peekLocalStorage, popLocalStorage, pushLocalStorage} from 'hooks/global/storage';
import {getRequestServer, postRequestServer} from 'network/service';
import {SET_APP_AUTH, SET_ERROR, SET_LOADING} from '../actions';
const {ACTION_TYPE} = require('constants/strings');
const {takeEvery, select, call, put} = require('redux-saga/effects');

function* authentication() {
  try {
    //INITIALIZATION OF APP-AUTH
    console.log('INITIALIZATION: APP-AUTH');
    const appAuth = yield call(getRequestServer, '/app-authentication');
    if (!appAuth.data.status) {
      console.error('Server Failed to connect');
      yield put(SET_ERROR({server: 'Server Maintenance'}));
      return put(push('/'));
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
      return yield put(SET_APP_AUTH({authenticated: false}));
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
    const userAuth = yield call(getRequestServer, '/signin-authentication-decoder', config);

    //check if the user authentication is invalid
    if (!userAuth.data.status) {
      yield popLocalStorage('sat');
      return yield put(
        SET_APP_AUTH({
          secondary_auth_token: '',
        }),
      );
    }

    yield put(
      SET_APP_AUTH({
        authenticated: true,
        secondary_auth_token: config.auth.secondary_auth_token,
      }),
    );
    yield put(push('/'));

    //check if the authenticated user is not assessed yet
    if (!userAuth.data.res.user._id_config.isAssessed) {
      return yield put(
        replace({
          pathname: `/assessment/information`,
          search: `?sat=${config.auth.secondary_auth_token}`,
        }),
      );
    }
  } catch (err) {
    console.log('Error[app-auth]:', err.message);
    yield put(SET_ERROR({request: err.message}));
    yield put(push('/'));
  }
}

function* signInAuthentication() {
  try {
    //INITIALIZATION of SESSION-AUTH
    const signin = yield select(state => state.signin);
    const signInAuth = yield call(
      postRequestServer,
      '/signin-authentication-encoder',
      {
        username: signin.username,
        password: signin.password,
      },
      yield serverConfig(),
    );

    yield put(SET_LOADING({status: false}));

    //check if there is an error on SignIn Request
    if (!signInAuth.data.status) {
      //if the data.err is undefined means the connection from the server is down
      if (!signInAuth.data.err) {
        return yield put(SET_ERROR({server: 'Server Maintenance'}));
      }
      //set loading to false and return the error message
      // yield put(SET_LOADING)
      return yield put(SET_ERROR({signin: signInAuth.data.err}));
    }

    //stored the new SAT on localstorage and save from the globalState
    yield pushLocalStorage('sat', signInAuth.data.res.secondary_auth_token);
    yield put(
      SET_APP_AUTH({
        authenticated: true,
        secondary_auth_token: signInAuth.data.res.secondary_auth_token,
      }),
    );

    //redirect the user if the user not yet done on assessment
    if (!signInAuth.data.res.user._id_config.isAssessed) {
      return yield put(
        replace({
          pathname: `/assessment/information`,
          search: `?sat=${signInAuth.data.res.secondary_auth_token}`,
        }),
      );
    }
  } catch (err) {
    console.log('Error[user-auth]:', err);
    yield put(SET_ERROR({request: err.message}));
    yield put(push('/'));
  }
}

function* assessmentAuthentication() {
  try {
    /*
      if user start directly in /assessment/ config is become to null
      because /app-auth is not yet initialize to set config thus it
    */
    const config = yield serverConfig();
    const userAuth = yield call(getRequestServer, '/signin-authentication-decoder', config);

    if (!userAuth.data.status) {
      if (!userAuth.data.err) {
        yield put(SET_ERROR({server: 'Server Maintenance'}));
        return yield put(push('/'));
      }

      yield put(SET_ERROR({page: 'Page Not Found'}));
      return yield put(push('/'));
    }
  } catch (err) {
    console.log('Error[assess-auth]:', err);
    yield put(SET_ERROR({request: err.message}));
    yield put(push('/'));
  }
}

export default function* rootAuthSaga() {
  yield takeEvery(ACTION_TYPE().APP_AUTH, authentication);
  yield takeEvery(ACTION_TYPE('SIGNIN').SET, signInAuthentication);
  yield takeEvery(ACTION_TYPE().ASSESS_AUTH, assessmentAuthentication);
}
