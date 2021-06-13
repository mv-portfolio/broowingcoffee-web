import {ACTION} from 'constants/string';
import {takeEvery} from 'redux-saga/effects';

function* worker() {
  yield console.log('Hi, you fired ACTION.PEEK');
}

function* woker2() {
  yield console.log('Hi, you fired ACTION.PUSH');
}

//change action based from the reducer type
function* watcher() {
  yield takeEvery(ACTION.PEEK, worker);
  yield takeEvery(ACTION.PUSH, woker2);
}

export default watcher;
