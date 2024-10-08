import {replace} from 'connected-react-router';
import {userInitState} from 'ducks/reducers/user';
import serverConfig from 'ducks/serverConfig';
import {server} from 'network/service';
import {peekLocalStorage} from 'storage';
import {getSpecificProperty} from 'utils/helper';
import {CLEAR_LOADING, SET_AUTH, SET_ERROR, SET_USER} from '../actions';
import {ACTION_TYPE} from 'constants/strings';
import {takeLatest, put, call} from 'redux-saga/effects';

function* authWorker() {
  try {
    const {res} = yield call(server.peek, '/app-authentication');
    yield put(SET_AUTH({primary_auth_token: res.primary_auth_token}));

    //check if the sat local-storage is empty
    const sat = yield peekLocalStorage('sat');
    if (!sat) {
      yield put(SET_AUTH({authenticated: false}));
      //force user to go in default page if sat is null
      yield put(replace({pathname: '/'}));
      return;
    }

    yield put(SET_AUTH({secondary_auth_token: sat}));

    // check the sat from local-storage
    const config = yield serverConfig();
    const {
      res: {user},
    } = yield call(server.peek, '/signin-authentication-decoder', config);

    yield put(SET_AUTH({authenticated: true}));

    const userInfo = getSpecificProperty(userInitState, user);
    if (!userInfo.isAssessed) {
      yield put(
        replace({
          pathname: `/assessment/information`,
          search: `?sat=${sat}`,
        }),
      );
      return;
    }

    yield put(SET_USER({...userInfo}));
    yield put(replace('/'));
  } catch (err) {
    console.log('APP-AUTH-REJECT', err);
    yield put(SET_ERROR({request: err}));
    yield put(CLEAR_LOADING());
  }
}

export default function* rootAuthSaga() {
  yield takeLatest(ACTION_TYPE('APP').AUTH, authWorker);
}
