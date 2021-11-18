import {call, put, takeLatest} from '@redux-saga/core/effects';
import {ACTION_TYPE} from 'constants/strings';
import {
  CLEAR_LOADING,
  CLEAR_PURCHASING_PRODUCTS,
  PEEK_INVENTORY,
  SET_ERROR,
  SET_LOADING,
} from 'modules/actions';
import serverConfig from 'modules/serverConfig';
import {server} from 'network/service';
import {onReport} from './reports';

function* peekWorker() {
  yield console.log('TRANSACTIONS-PEEK');
}

function* pushWorker({transaction}) {
  try {
    const config = yield serverConfig();
    const {res} = yield call(server.push, '/transactions/push', transaction, config);
    yield put(PEEK_INVENTORY());
    yield put(CLEAR_PURCHASING_PRODUCTS());
    yield put(SET_LOADING({status: false, message: 'transaction-success'}));

    yield onReport({
      action: 'ADD',
      module: 'transactions',
      reference: res,
    });

    yield console.log('PUSH-TRANSACTION-RESOLVE');
  } catch (err) {
    yield console.log('PUSH-TRANSACTION-REJECT', err);
    yield put(SET_ERROR({transaction: err}));
    yield put(SET_LOADING({status: false, message: 'transaction-failed'}));
  }
}

export default function* rootTransactionSaga() {
  yield takeLatest(ACTION_TYPE('TRANSACTIONS').PEEK, peekWorker);
  yield takeLatest(ACTION_TYPE('TRANSACTIONS').PUSH, pushWorker);
}
