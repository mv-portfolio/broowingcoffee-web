import {call, put, select, takeLatest} from '@redux-saga/core/effects';
import {ACTION_TYPE} from 'constants/strings';
import {POP_INVENTORY, SET_ERROR, SET_INVENTORY} from 'modules/actions';
import serverConfig from 'modules/serverConfig';
import {server} from 'network/service';
import {arrayFind} from 'utils/helper';

function* peekWorker() {
  try {
    const config = yield serverConfig();
    const {res: items} = yield call(server.peek, '/inventory', config);
    yield console.log('PEEK-INVENTORY-RESOLVE');
    yield put(SET_INVENTORY({items}));
  } catch (err) {
    yield console.log('PEEK-INVENTORY-REJECT');
  }
}

function* pushWorker({item}) {
  try {
    const config = yield serverConfig();
    yield call(server.push, '/inventory/push', item, config);
    yield peekWorker();
    yield console.log('PUSH-INVENTORY-RESOLVE');
  } catch (err) {
    yield console.log('PUSH-INVENTORY-REJECT');
    yield put(SET_ERROR({inventory: err}));
  }
}

function* setWorker(state) {
  try {
    let quantity = state.item.quantity;
    if (state.type === ACTION_TYPE('INVENTORY-RESTOCK').SET_INDEX) {
      const items = yield select(state => state.inventory.items);
      const item = arrayFind(items, {name: state.item.name});
      quantity = item.quantity;
    }
    const config = yield serverConfig();
    yield call(server.set, '/inventory/set', {...state.item, quantity}, config);
    yield console.log('SET-INVENTORY-RESOLVE');
  } catch (err) {
    yield console.log('SET-INVENTORY-REJECT');
  }
}

function* popWorker(state) {
  try {
    const config = yield serverConfig();
    yield call(server.pop, '/inventory/pop', {name: state.itemId}, config);
    yield put(POP_INVENTORY({itemId: state.itemId}));
    yield console.log('POP-INVENTORY-RESOLVE');
  } catch (err) {
    yield console.log('POP-INVENTORY-REJECT');
    yield put(SET_ERROR({inventory: err}));
  }
}

export default function* rootInventorSaga() {
  yield takeLatest(ACTION_TYPE('INVENTORY').PEEK, peekWorker);
  yield takeLatest(ACTION_TYPE('INVENTORY').PUSH, pushWorker);
  yield takeLatest(
    [ACTION_TYPE('INVENTORY').SET_INDEX, ACTION_TYPE('INVENTORY-RESTOCK').SET_INDEX],
    setWorker,
  );
  yield takeLatest(ACTION_TYPE('INVENTORY-REQ').POP, popWorker);
}
