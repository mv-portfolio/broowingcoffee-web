import {replace} from 'connected-react-router';
import {ACTION_TYPE} from 'constants/strings';
import {CLEAR_LOADING, SET_ERROR, SET_USER} from 'ducks/actions';
import serverConfig from 'ducks/serverConfig';
import {server} from 'network/service';
import {call, put, takeLatest} from 'redux-saga/effects';

function* assessmentAuthWorker() {
  try {
    const config = yield serverConfig();
    const {res} = yield call(server.peek, '/signin-authentication-decoder', config);
    yield put(SET_USER({_id: res.user._id}));
    console.log('ASSESSMENT-AUTH-RESOLVE');
  } catch (err) {
    console.log('ASSESSMENT-AUTH-REJECT');  
    yield put(SET_ERROR({request: err}));
    yield put(CLEAR_LOADING());
  }
}

function* assessmentUpdateWorker({data}) {
  try {
    const config = yield serverConfig();
    console.log(data);
    yield call(server.set, '/users/set', data, config);
    yield put(SET_USER({...data, isAssessed: true}));
    yield put(replace('/'));
    console.log('ASSESSMENT-UPDATE-RESOLVE');
  } catch (err) {
    console.log('ASSESSMENT-UPDATE-REJECT');
    yield put(SET_ERROR({assessment: err}));
    yield put(CLEAR_LOADING());
  }
}

export default function* rootAssessmentSaga() {
  yield takeLatest(ACTION_TYPE('ASSESSMENT').AUTH, assessmentAuthWorker);
  yield takeLatest(ACTION_TYPE('ASSESSMENT').SET, assessmentUpdateWorker);
}
