import {replace} from 'connected-react-router';
import {ACTION_TYPE} from 'constants/strings';
import {CLEAR_LOADING, SET_AUTH, SET_ERROR, SET_LOADING, SET_USER} from 'ducks/actions';
import {userInitState} from 'ducks/reducers/user';
import serverConfig from 'ducks/serverConfig';
import {server} from 'network/service';
import {call, put, takeLatest} from 'redux-saga/effects';
import {pushLocalStorage} from 'storage';
import {getSpecificProperty} from 'utils/helper';

function* signInWorker(payload) {
  try {
    yield put(SET_LOADING({status: true}));

    const config = yield serverConfig();
    const {res} = yield call(
      server.push,
      '/signin-authentication-encoder',
      payload,
      config,
    );

    yield pushLocalStorage('sat', res.secondary_auth_token);
    yield put(
      SET_AUTH({
        authenticated: true,
        secondary_auth_token: res.secondary_auth_token,
      }),
    );
    yield put(
      SET_USER({
        _id: res.user._id,
      }),
    );
    yield put(SET_LOADING({status: false, status: 'sign-in-resolve'}));

    const userInfo = getSpecificProperty(userInitState, res.user);
    if (!userInfo.isAssessed) {
      yield put(
        replace({
          pathname: `/assessment/information`,
          search: `?sat=${res.secondary_auth_token}`,
        }),
      );
      return;
    }

    yield put(SET_USER({...userInfo}));
    yield put(replace('/'));
  } catch (err) {
    console.log('SIGN-IN-REJECT:', err);
    yield put(SET_ERROR({signin: err}));
    yield put(CLEAR_LOADING());
  } finally {
    yield put(CLEAR_LOADING());
  }
}

export default function* rootSignInSaga() {
  yield takeLatest(ACTION_TYPE('SIGNIN').SET, signInWorker);
}
