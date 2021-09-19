import {call, put, takeEvery} from '@redux-saga/core/effects';
import {ACTION_TYPE} from 'constants/strings';
import {SET_INVENTORY} from 'modules/actions';
import serverConfig from 'modules/serverConfig';
import {server} from 'network/service';

function* peekWorker() {
  try {
    const config = yield serverConfig();
    const {res: items} = yield call(server.peek, '/inventory', config);
    yield console.log('PEEK-INVENTORY-RESOLVE', items);
    yield put(SET_INVENTORY({items}));
  } catch (err) {
    yield console.log('PEEK-INVENTORY-REJECT', err);
  }
}

function* pushWorker({item}) {
  try {
    const config = yield serverConfig();
    yield call(server.push, '/inventory/push', {...item}, config);
    yield console.log('PUSH-INVENTORY-RESOLVE', item);
  } catch (err) {
    yield console.log('PUSH-INVENTORY-REJECT', err);
  }
}

function* setWorker(state) {
  try {
    const config = yield serverConfig();
    yield call(server.set, '/inventory/set', state.payload, config);
    yield console.log('SET-INVENTORY-RESOLVE', state);
  } catch (err) {
    yield console.log('SET-INVENTORY-REJECT', err);
  }
}

function* popWorker(state) {
  try {
    const config = yield serverConfig();
    yield call(server.pop, '/inventory/pop', {name: state.itemId}, config);
    yield console.log('POP-INVENTORY-RESOLVE', state);
  } catch (err) {
    yield console.log('POP-INVENTORY-REJECT', err);
  }
}

export default function* rootInventorSaga() {
  yield takeEvery(ACTION_TYPE('INVENTORY').PEEK, peekWorker);
  yield takeEvery(ACTION_TYPE('INVENTORY').PUSH, pushWorker);
  yield takeEvery(ACTION_TYPE('INVENTORY').SET_INDEX, setWorker);
  yield takeEvery(ACTION_TYPE('INVENTORY').POP, popWorker);
}
