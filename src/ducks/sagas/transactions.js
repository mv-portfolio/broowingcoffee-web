import {call, put, takeLatest, select} from 'redux-saga/effects';
import {ACTION_TYPE} from 'constants/strings';
import {
  CLEAR_LOADING,
  CLEAR_PURCHASING_PRODUCTS,
  PEEK_INVENTORY,
  PUSH_TRANSACTIONS,
  SET_ERROR,
  SET_LOADING,
  SET_TRANSACTIONS,
} from 'ducks/actions';
import serverConfig from 'ducks/serverConfig';
import {server} from 'network/service';
import {popLocalStorage} from 'storage';
import {manipulateData} from 'utils/helper';
import {timeout} from 'network/api/server';
import {onReport} from './reports';

function* peekWorker(state) {
  try {
    yield put(SET_LOADING({status: true}));

    const config = yield serverConfig();
    const date = new Date(
      state.filtered_date.getFullYear(),
      state.filtered_date.getMonth(),
    );

    const {
      res: {transactions, top_list, manipulated_data},
    } = yield call(server.peek, '/transactions', {
      ...config,
      timeout: timeout(10),
      params: {
        min: date.getTime(),
        max: new Date(date.getFullYear(), date.getMonth() + 1).getTime(),
      },
    });

    yield put(SET_TRANSACTIONS({manipulated_data, transactions, top_list}));
    yield console.log('PEEK-TRANSACTIONs-RESOLVE');
  } catch (err) {
    if (!err.includes('jwt')) {
      yield console.log('PEEK-TRANSACTIONs-REJECT', err);
      yield put(SET_ERROR({transaction: err}));
    }
  } finally {
    yield put(CLEAR_LOADING());
  }
}
function* pushWorker(state) {
  try {
    yield put(SET_LOADING({status: true}));

    const config = yield serverConfig();
    const {res} = yield call(
      server.push,
      '/transactions/push',
      state.transaction,
      config,
    );

    yield put(PEEK_INVENTORY());
    yield put(CLEAR_PURCHASING_PRODUCTS());

    yield put(PUSH_TRANSACTIONS({transaction: res}));
    yield onReport({
      action: 'ADD',
      module: 'transactions',
      reference: res,
      date_created: state.transaction.date_created,
    });

    yield put(SET_LOADING({status: false, message: 'push-transaction-resolve'}));

    // yield popLocalStorage('tmp');
  } catch (err) {
    if (!err.includes('jwt')) {
      yield console.log('PUSH-TRANSACTION-REJECT', err);
      yield put(SET_ERROR({transaction: err}));
    }
  } finally {
    yield put(CLEAR_LOADING());
  }
}

export default function* rootTransactionSaga() {
  yield takeLatest(ACTION_TYPE('TRANSACTIONS').PEEK, peekWorker);
  yield takeLatest(ACTION_TYPE('TRANSACTIONS-REQ').PUSH, pushWorker);
}
