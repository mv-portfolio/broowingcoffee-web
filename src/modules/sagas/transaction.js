import {call, put, takeEvery} from '@redux-saga/core/effects';
import {ACTION_TYPE} from 'constants/strings';
import {
  CLEAR_LOADING,
  CLEAR_PURCHASING_PRODUCTS,
  PEEK_INVENTORY,
  SET_ERROR,
} from 'modules/actions';
import serverConfig from 'modules/serverConfig';
import {server} from 'network/service';

function* peekWorker() {
  yield console.log('TRANSACTIONS-PEEK');
}

function* pushWorker({transaction}) {
  try {
    const config = yield serverConfig();
    yield call(server.push, '/transactions/push', transaction, config);
    yield put(PEEK_INVENTORY());
    yield put(CLEAR_PURCHASING_PRODUCTS());
    yield put(CLEAR_LOADING());
  } catch (err) {
    yield console.log('TRANSACTION-REJECT', err);
    yield put(SET_ERROR({transaction: err}));
    yield put(CLEAR_LOADING());
  }
}

export default function* rootTransactionSaga() {
  yield takeEvery(ACTION_TYPE('TRANSACTIONS').PEEK, peekWorker);
  yield takeEvery(ACTION_TYPE('TRANSACTIONS').PUSH, pushWorker);
}
