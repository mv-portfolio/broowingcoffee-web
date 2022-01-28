import {call, select, put, takeLatest} from '@redux-saga/core/effects';

import {ACTION_TYPE} from 'constants/strings';
import {
  CLEAR_LOADING,
  PUSH_REPORT,
  SET_ERROR,
  SET_LOADING,
  SET_REPORTS,
} from 'ducks/actions';
import serverConfig from 'ducks/serverConfig';
import {timeout} from 'network/api/server';
import {server} from 'network/service';

export function* onReport({action, module, reference, date_created}) {
  const {firstname, lastname} = yield select(state => state.user);
  if (module === 'transactions') {
    yield put(
      PUSH_REPORT({
        transactionHistory: {
          action,
          module,
          reference,
          date_created: date_created || new Date().getTime(),
        },
      }),
    );
    return;
  }
  yield put(
    PUSH_REPORT({
      otherHistory: {
        action,
        module,
        reference: {
          ...reference,
          made_by: `${firstname} ${lastname}`,
        },
        date_created: new Date().getTime(),
      },
    }),
  );
}

function* peekWorker(state) {
  try {
    const config = yield serverConfig();
    const {
      filter: {type, date},
    } = state;

    yield put(SET_LOADING({status: true}));

    const {res} = yield call(server.peek, '/reports', {
      ...config,
      timeout: timeout(10),
      params: {date},
    });

    if (type) {
      if (type === 'transaction') {
        const transactionHistories = res.filter(
          response => response.module === 'transactions',
        );
        yield put(SET_REPORTS({transactionHistories}));
        return;
      }
      const otherHistories = res.filter(response => response.module !== 'transactions');
      yield put(SET_REPORTS({otherHistories}));
    } else {
      const transactionHistories = res.filter(
        response => response.module === 'transactions',
      );
      const otherHistories = res.filter(response => response.module !== 'transactions');
      yield put(SET_REPORTS({transactionHistories, otherHistories}));
    }
  } catch (err) {
    if (!err.includes('jwt')) {
      console.log('PEEK-REPORTS-REJECT', err);
      yield put(SET_ERROR({report: err}));
    }
  } finally {
    yield put(CLEAR_LOADING());
  }
}
function* pushWorker(state) {
  try {
    const config = yield serverConfig();
    if (state.transactionHistory) {
      yield call(server.push, '/reports/push', state.transactionHistory, config);
    } else {
      yield call(server.push, '/reports/push', state.otherHistory, config);
    }
  } catch (err) {
    if (!err.includes('jwt')) {
      console.log('PEEK-REPORTS-REJECT', err);
      yield put(SET_ERROR({report: err}));
    }
  }
}

export default function* rootReportSaga() {
  yield takeLatest(ACTION_TYPE('REPORTS').PEEK, peekWorker);
  yield takeLatest(ACTION_TYPE('REPORTS').PUSH, pushWorker);
}
