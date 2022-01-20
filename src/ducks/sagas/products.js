import {ACTION_TYPE} from 'constants/strings';
import {PEEK_PRODUCTS} from 'ducks/actions';
import {takeLatest} from 'redux-saga/effects';

function* peekWorker() {
  try {
    yield console.log('PEEK-PRODUCTS-RESOLVE');
  } catch (err) {
    yield console.log('PEEK-PRODUCTS-REJECT');
  }
}
function* pushWorker(state) {
  try {
    yield console.log('PUSH-PRODUCTS-RESOLVE');
  } catch (err) {
    yield console.log('PUSH-PRODUCTS-REJECT');
  } finally {
  }
}
function* setWorker(state) {
  try {
    yield console.log('SET-PRODUCTS-RESOLVE');
  } catch (err) {
    yield console.log('SET-PRODUCTS-REJECT');
  } finally {
  }
}
function* popWorker(state) {
  try {
    yield console.log('POP-PRODUCTS-RESOLVE');
  } catch (err) {
    yield console.log('POP-PRODUCTS-REJECT');
  }
}

export default function* rootProductsSaga() {
  yield takeLatest(ACTION_TYPE('PRODUCTS').PEEK, peekWorker);
  yield takeLatest(ACTION_TYPE('PRODUCTS-REQ').PUSH, pushWorker);
  yield takeLatest(ACTION_TYPE('PRODUCTS-REQ').SET_INDEX, setWorker);
  yield takeLatest(ACTION_TYPE('PRODUCTS').POP, popWorker);
}
