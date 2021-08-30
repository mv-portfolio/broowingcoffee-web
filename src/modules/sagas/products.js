import {ACTION_TYPE} from 'constants/strings';
import {takeEvery} from 'redux-saga/effects';

function* worker() {
  yield console.log("Hi!, I'm worker from PRODUCTS");
}

function* rootProductsSaga() {
  yield takeEvery(ACTION_TYPE('PRODUCTS').PEEK, worker);
}

export default rootProductsSaga;
