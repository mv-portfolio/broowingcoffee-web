import {call, put, takeLatest} from '@redux-saga/core/effects';
import {ACTION_TYPE} from 'constants/strings';
import {
  CLEAR_PURCHASING_PRODUCTS,
  PEEK_INVENTORY,
  SET_ERROR,
  SET_LOADING,
  SET_TRANSACTIONS,
} from 'modules/actions';
import serverConfig from 'modules/serverConfig';
import {server} from 'network/service';
import {manipulateData} from 'utils/helper';
import {onReport} from './reports';

function* peekWorker(state) {
  try {
    const config = yield serverConfig();
    const date = new Date(state.date);
    const {res} = yield call(server.peek, '/transactions', {
      ...config,
      params: {date},
    });
    yield put(
      SET_TRANSACTIONS({
        manipulatedData: manipulateData(res.transactions, [
          date.getFullYear(),
          date.getMonth() + 1,
        ]),
        data: res.transactions,
        topList: res.topList,
      }),
    );
  } catch (err) {
    yield console.log('PEEK-TRANSACTION-REJECT', err);
    yield put(SET_ERROR({transaction: err}));
  }
}

function* pushWorker(state) {
  try {
    const config = yield serverConfig();
    const {res} = yield call(server.push, '/transactions/push', state.transaction, config);
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
