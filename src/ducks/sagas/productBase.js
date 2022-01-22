import {ACTION_TYPE} from 'constants/strings';
import {
  CLEAR_LOADING,
  PUSH_PRODUCT_BASE,
  SET_ERROR,
  SET_LOADING,
  SET_PRODUCT_BASE,
} from 'ducks/actions';
import serverConfig from 'ducks/serverConfig';
import {server} from 'network/service';
import {call, put, takeLatest} from 'redux-saga/effects';

function* peekWorker(state) {
  try {
    const config = yield serverConfig();
    const {res: bases} = yield call(server.peek, '/product-base', config);

    yield put(SET_PRODUCT_BASE({bases}));
    console.log('PEEK-PRODUCT-BASE-RESOLVE', bases);
  } catch (err) {
    console.log('PEEK-PRODUCT-BASE-REJECT');
    if (!err.includes('jwt')) {
      yield put(SET_ERROR({productBase: err}));
    }
  } finally {
  }
}
function* pushWorker(state) {
  try {
    yield put(SET_LOADING({status: true}));

    const config = yield serverConfig();
    const {res: base} = yield call(server.push, '/product-base/push', state.base, config);

    yield put(PUSH_PRODUCT_BASE({base}));
    yield put(SET_LOADING({status: false, message: 'push-product-base-resolve'}));
  } catch (err) {
    if (!err.includes('jwt')) {
      yield put(SET_ERROR({productBase: err}));
    }
  } finally {
    yield put(CLEAR_LOADING());
  }
}
function* popWorker(state) {
  try {
    yield put(SET_LOADING({status: true}));

    const config = yield serverConfig();
    yield call(server.pop, '/product-base/pop', state.base, config);

    yield put(SET_LOADING({status: false, message: 'pop-product-base-resolve'}));
    console.log('PUSH-PRODUCT-BASE-RESOLVE');
  } catch (err) {
    console.log('PUSH-PRODUCT-BASE-REJECT');
  } finally {
    yield put(CLEAR_LOADING());
  }
}

export default function* rootProductBaseSaga() {
  yield takeLatest(ACTION_TYPE('PRODUCT-BASE').PEEK, peekWorker);
  yield takeLatest(ACTION_TYPE('PRODUCT-BASE-REQ').PUSH, pushWorker);
  yield takeLatest(ACTION_TYPE('PRODUCT-BASE').POP, popWorker);
}
