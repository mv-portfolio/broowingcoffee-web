import {ACTION_TYPE} from 'constants/strings';
import {takeEvery} from 'redux-saga/effects';

function* worker() {
  yield console.log('Hi, USER fired USER.PEEK');
}

//change action based from the reducer type
function* rootUsersSaga() {
  yield takeEvery(ACTION_TYPE('USERS').PEEK, worker);
}

export default rootUsersSaga;
