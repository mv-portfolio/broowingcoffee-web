import {takeEvery} from '@redux-saga/core/effects';
import {ACTION_TYPE} from 'constants/strings';

function* peekWorker() {
  console.log('TRANSACTIONS-PEEK');
}

function* pushWorker() {
  console.log('TRANSACTIONS-PUSH');
}

export default function* rootTransaction() {
  yield takeEvery(ACTION_TYPE('TRANSACTIONS').PEEK, peekWorker);
  yield takeEvery(ACTION_TYPE('TRANSACTIONS').PUSH, pushWorker);
}
