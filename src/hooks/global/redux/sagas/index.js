import {all} from 'redux-saga/effects';
import rootUserSaga from './userSaga';
import rootProductSaga from './productSaga';

export default function* rootSaga() {
  yield all([rootUserSaga(), rootProductSaga()]);
}
