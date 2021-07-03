import serverConfig from './serverConfig';

import {push, replace} from 'connected-react-router';
import {peekLocalStorage, popLocalStorage, pushLocalStorage} from 'hooks/global/storage';
import {getRequestServer, postRequestServer} from 'network/service';
import {SET_APP_AUTH, SET_ERROR, SET_LOADING, SET_USER} from '../actions';
import ObjectCleaner from 'utils/ObjectCleaner';
import {userInitState} from '../reducers/user';
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
          authenticated: false,
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
    yield put(
      SET_USER({
        _id: userAuth.data.res.user._id,
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

    //if it is assessed already from signin-authentication-decoder, setUser on redux
    yield put(
      SET_USER({
        ...ObjectCleaner.getFilteredFields(Object.keys(userInitState), userAuth.data.res.user),
      }),
    );
  } catch (err) {
    console.log('Error[app-auth]:', err);
    yield put(SET_ERROR({request: err.message}));
    yield put(push('/'));
  }
}

function* signInAuthentication() {
  try {
    //INITIALIZATION of SESSION-AUTH
    const signin = yield select(state => state.signin);
    const {
      data: {status, err, res},
    } = yield call(
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
    if (!status) {
      //if the data.err is undefined means the connection from the server is down
      if (!err) {
        return yield put(SET_ERROR({server: 'Server Maintenance'}));
      }
      //set loading to false and return the error message
      // yield put(SET_LOADING)
      return yield put(SET_ERROR({signin: err}));
    }

    //stored the new SAT on localstorage and save from the globalState
    yield pushLocalStorage('sat', res.secondary_auth_token);
    yield put(
      SET_APP_AUTH({
        authenticated: true,
        secondary_auth_token: res.secondary_auth_token,
      }),
    );
    yield put(
      SET_USER({
        _id: res.user._id,
      }),
    );

    //redirect the user if the user not yet done on assessment
    if (!res.user._id_config.isAssessed) {
      return yield put(
        replace({
          pathname: `/assessment/information`,
          search: `?sat=${res.secondary_auth_token}`,
        }),
      );
    }

    //if it is assessed already from signin-authentication-decoder, setUser on redux
    yield put(
      SET_USER({
        ...ObjectCleaner.getFilteredFields(Object.keys(userInitState), res.user),
      }),
    );
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

function* assessmentUpdate() {
  try {
    const {
      assessment: {data},
      auth,
      headers,
    } = yield serverConfig();
    const {
      data: {err, status},
    } = yield call(postRequestServer, '/users/set', data, {headers});

    if (!status) {
      yield put(
        SET_ERROR({
          assessment: err,
        }),
      );
      if (err.includes('Firstname') || err.includes('Lastname')) {
        return yield put(push({pathname: '/assessment/information', search: `?sat=${auth.secondary_auth_token}`}));
      }
      return;
    }
    yield put(push('/'));
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
  //NEW
  yield takeEvery(ACTION_TYPE('ASSESSMENT').SET, assessmentUpdate);
}
