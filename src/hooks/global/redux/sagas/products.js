import {ACTION} from 'constants/string';
import {takeEvery} from 'redux-saga/effects';

function* worker() {
  yield console.log('Hi, PRODUCT fired PRODUCT.PEEK');
}

//change action based from the reducer type
function* rootProductsSaga() {
  yield takeEvery(ACTION('PRODUCTS').PEEK, worker);
}

export default rootProductsSaga;
