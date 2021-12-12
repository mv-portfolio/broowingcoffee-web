import {ACTION_TYPE} from 'constants/strings';
import {takeLatest} from 'redux-saga/effects';

function* worker() {
  yield console.log('Hi, USER fired USER.PEEK');
}

//change action based from the reducer type
export default function* rootUsersSaga() {
  yield takeLatest(ACTION_TYPE('USERS').PEEK, worker);
}
