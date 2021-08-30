import {replace} from 'connected-react-router';
import {ACTION_TYPE} from 'constants/strings';
import {CLEAR_LOADING, SET_ERROR, SET_USER} from 'modules/actions';
import serverConfig from 'modules/serverConfig';
import {server} from 'network/service';
import {call, put, takeEvery} from 'redux-saga/effects';

function* assessmentAuthWorker() {
  try {
    const config = yield serverConfig();
    const {res} = yield call(server.get, '/signin-authentication-decoder', config);
    yield put(SET_USER({_id: res.user._id}));
  } catch (err) {
    console.log('ASSESSMENT-AUTH-REJECT:', err);
    yield put(SET_ERROR({request: err}));
    yield put(CLEAR_LOADING());
  }
}

function* assessmentUpdateWorker({data}) {
  try {
    const config = yield serverConfig();
    const {res} = yield call(server.post, '/users/set', data, config);
    console.log(data);
    yield put(SET_USER({...data, isAssessed: true}));
    yield put(replace('/'));
  } catch (err) {
    console.log('ASSESSMENT-UPDATE-REJECT:', err);
    yield put(SET_ERROR({assessment: err}));
    yield put(CLEAR_LOADING());
  }
}

export default function* rootAssessmentSaga() {
  yield takeEvery(ACTION_TYPE('ASSESSMENT').AUTH, assessmentAuthWorker);
  yield takeEvery(ACTION_TYPE('ASSESSMENT').SET, assessmentUpdateWorker);
}
