import {call, select, put, takeLatest} from '@redux-saga/core/effects';

import {ACTION_TYPE} from 'constants/strings';
import {PUSH_REPORT, SET_ERROR, SET_REPORTS} from 'modules/actions';
import serverConfig from 'modules/serverConfig';
import {server} from 'network/service';

export function* onReport({action, module, reference}) {
  const {email} = yield select(state => state.user);
  if (module === 'transactions') {
    yield put(
      PUSH_REPORT({
        transactionHistory: {
          email,
          action,
          module,
          reference,
          date_created: new Date().getTime(),
        },
      }),
    );
    return;
  }
  yield put(
    PUSH_REPORT({
      otherHistory: {
        email,
        action,
        module,
        reference,
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
    const {res} = yield call(server.peek, '/reports', {...config, params: {date}});
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

    console.log('PEEK-REPORT-RESOLVE');
  } catch (err) {
    console.log('PEEK-REPORT-REJECT', err);
    yield put(SET_ERROR({report: err}));
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
    console.log('PUSH-REPORT-RESOLVE');
  } catch (err) {
    console.log('PUSH-REPORT-REJECT', err);
    yield put(SET_ERROR({report: err}));
  }
}

export default function* rootReportSaga() {
  yield takeLatest(ACTION_TYPE('REPORTS').PEEK, peekWorker);
  yield takeLatest(ACTION_TYPE('REPORTS').PUSH, pushWorker);
}
