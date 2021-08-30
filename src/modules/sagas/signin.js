import {push, replace} from 'connected-react-router';
import {ACTION_TYPE} from 'constants/strings';
import {CLEAR_LOADING, SET_AUTH, SET_ERROR, SET_USER} from 'modules/actions';
import {userInitState} from 'modules/reducers/user';
import serverConfig from 'modules/serverConfig';
import {server} from 'network/service';
import {call, put, takeEvery} from 'redux-saga/effects';
import {pushLocalStorage} from 'storage';
import ObjectCleaner from 'utils/ObjectCleaner';

function* signInWorker(payload) {
  try {
    const config = yield serverConfig();
    const {res} = yield call(
      server.post,
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
    yield put(CLEAR_LOADING());

    const user = ObjectCleaner.getFilteredFields(userInitState, res.user);

    if (!user.isAssessed) {
      yield put(
        replace({
          pathname: `/assessment/information`,
          search: `?sat=${res.secondary_auth_token}`,
        }),
      );
      return;
    }

    yield put(SET_USER({...user}));
    yield put(replace('/'));
  } catch (err) {
    console.log('SIGN-IN-REJECT:', err);
    yield put(SET_ERROR({signin: err}));
    yield put(CLEAR_LOADING());
  }
}

export default function* rootSignInSaga() {
  yield takeEvery(ACTION_TYPE('SIGNIN').SET, signInWorker);
}
