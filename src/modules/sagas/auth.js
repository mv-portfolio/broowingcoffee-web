import {replace} from 'connected-react-router';
import {userInitState} from 'modules/reducers/user';
import serverConfig from 'modules/serverConfig';
import {server} from 'network/service';
import {peekLocalStorage, pushLocalStorage} from 'storage';
import ObjectCleaner from 'utils/ObjectCleaner';
import {CLEAR_LOADING, SET_AUTH, SET_ERROR, SET_USER} from '../actions';
const {ACTION_TYPE} = require('constants/strings');
const {takeEvery, put, call} = require('redux-saga/effects');

function* authWorker() {
  try {
    const {res} = yield call(server.get, '/app-authentication');
    yield put(
      SET_AUTH({
        primary_auth_token: res.primary_auth_token,
      }),
    );

    //check if the sat local-storage is empty
    const sat = yield peekLocalStorage('sat');
    if (!sat) {
      yield put(
        SET_AUTH({
          authenticated: false,
        }),
      );
      return;
    }

    yield put(
      SET_AUTH({
        secondary_auth_token: sat,
      }),
    );

    // check the sat from local-storage
    const config = yield serverConfig();
    const {
      res: {user},
    } = yield call(server.get, '/signin-authentication-decoder', config);

    yield put(
      SET_AUTH({
        authenticated: true,
      }),
    );

    const {isAssessed} = ObjectCleaner.getFilteredFields(userInitState, user);
    if (!isAssessed) {
      yield put(
        replace({
          pathname: `/assessment/information`,
          search: `?sat=${sat}`,
        }),
      );
      return;
    }

    yield put(
      SET_USER({
        ...ObjectCleaner.getFilteredFields(Object.keys(userInitState), user),
      }),
    );
    yield put(replace('/'));
  } catch (err) {
    console.log('APP-AUTH-REJECT', err);
    yield put(SET_ERROR({request: err}));
    yield put(CLEAR_LOADING());
  }
}

export default function* rootAuthSaga() {
  yield takeEvery(ACTION_TYPE('APP').AUTH, authWorker);
}
