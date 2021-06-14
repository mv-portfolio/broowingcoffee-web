import {ACTION} from 'constants/string';
import {takeEvery} from 'redux-saga/effects';

function* worker() {
  yield console.log("Hi!, I'm worker from PRODUCTS");
}

function* rootProductsSaga() {
  yield takeEvery(ACTION('PRODUCTS').PEEK, worker);
}

export default rootProductsSaga;
