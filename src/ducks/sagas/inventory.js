import {call, put, select, takeLatest} from 'redux-saga/effects';
import {ACTION_TYPE} from 'constants/strings';
import {
  POP_INVENTORY,
  SET_ERROR,
  SET_INDEX_INVENTORY,
  SET_INVENTORY,
  SET_LOADING,
} from 'ducks/actions';
import serverConfig from 'ducks/serverConfig';
import {server} from 'network/service';
import {arrayFind, getPropertyChanges} from 'utils/helper';
import {onReport} from './reports';

function* peekWorker() {
  try {
    const config = yield serverConfig();
    const {res: items} = yield call(server.peek, '/inventory', config);
    yield put(SET_INVENTORY({items}));
    yield console.log('PEEK-INVENTORY-RESOLVE');
  } catch (err) {
    yield console.log('PEEK-INVENTORY-REJECT');
  }
}
function* pushWorker({item}) {
  try {
    const config = yield serverConfig();
    yield put(SET_LOADING({status: true}));
    const {res: pushResponse} = yield call(server.push, '/inventory/push', item, config);
    yield peekWorker();

    yield onReport({
      action: 'ADD',
      module: 'inventory',
      reference: pushResponse,
    });

    yield console.log('PUSH-INVENTORY-RESOLVE');
  } catch (err) {
    yield console.log('PUSH-INVENTORY-REJECT');
    if (!err.includes('jwt')) {
      yield put(SET_ERROR({inventory: err}));
      yield put(POP_INVENTORY({itemId: item.name}));
    }
  } finally {
    yield put(SET_LOADING({status: false, message: 'done'}));
  }
}
function* setWorker(state) {
  try {
    const config = yield serverConfig();
    yield put(SET_LOADING({status: true}));
    let tempItem = state.item;
    let action = 'UPDATE';

    if (state.type.includes('RESTOCK')) {
      const items = yield select(state => state.inventory.items);
      const item = arrayFind(items, {name: state.item.name});
      tempItem.quantity += item.quantity;
      action = 'RESTOCK';
    }

    const {res: peekResponse} = yield call(server.peek, '/inventory', {
      ...config,
      params: {
        name: state.item.name,
      },
    });

    yield call(server.set, '/inventory/set', {...state.item, ...tempItem}, config);
    yield put(SET_INDEX_INVENTORY({item: tempItem}));

    const reference = getPropertyChanges(peekResponse[0], {...state.item, ...tempItem});
    yield onReport({
      action,
      module: 'inventory',
      reference,
    });

    yield console.log('SET-INVENTORY-RESOLVE');
  } catch (err) {
    yield console.log('SET-INVENTORY-REJECT', err);
    if (!err.includes('jwt')) {
      yield put(SET_ERROR({inventory: err}));
    }
  } finally {
    yield put(SET_LOADING({status: false, message: 'done'}));
  }
}
function* popWorker(state) {
  try {
    const config = yield serverConfig();
    const {res: peekResponse} = yield call(server.peek, '/inventory', {
      ...config,
      params: {
        name: state.itemId,
      },
    });

    yield call(server.pop, '/inventory/pop', {name: state.itemId}, config);
    yield put(POP_INVENTORY({itemId: state.itemId}));

    yield onReport({
      action: 'DELETE',
      module: 'inventory',
      reference: peekResponse[0],
    });

    yield console.log('POP-INVENTORY-RESOLVE');
  } catch (err) {
    yield console.log('POP-INVENTORY-REJECT');
    if (!err.includes('jwt')) {
      yield put(SET_ERROR({inventory: err}));
    }
  }
}

export default function* rootInventorSaga() {
  yield takeLatest(ACTION_TYPE('INVENTORY').PEEK, peekWorker);
  yield takeLatest(ACTION_TYPE('INVENTORY').PUSH, pushWorker);
  yield takeLatest(
    [
      ACTION_TYPE('INVENTORY-REQ').SET_INDEX,
      ACTION_TYPE('INVENTORY-RESTOCK-REQ').SET_INDEX,
    ],
    setWorker,
  );
  yield takeLatest(ACTION_TYPE('INVENTORY-REQ').POP, popWorker);
}
