import {call, put, takeLatest} from 'redux-saga/effects';
import {ACTION_TYPE} from 'constants/strings';
import serverConfig from 'modules/serverConfig';
import {server} from 'network/service';
import {CLEAR_LOADING, SET_LOADING} from 'modules/actions';

function* pushWorker(state) {
  try {
    const config = yield serverConfig();
    const {res} = yield call(
      server.push,
      '/report-bug',
      {from: state.from, title: state.title, issue: state.issue},
      {
        ...config,
        timeout: 7000,
      },
    );
    yield put(SET_LOADING({status: false, message: res}));
  } catch (err) {
    yield put(CLEAR_LOADING());
    console.log('PUSH-REPORT-BUG-REJECT', err);
  }
}

export default function* rootReportBugSaga() {
  yield takeLatest(ACTION_TYPE('REPORT-BUG').PUSH, pushWorker);
}
