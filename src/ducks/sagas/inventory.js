import {call, put, select, takeLatest} from 'redux-saga/effects';
import {ACTION_TYPE, ITEM_PROPERTIES} from 'constants/strings';
import {
  CLEAR_LOADING,
  POP_INVENTORY,
  PUSH_INVENTORY,
  SET_ERROR,
  SET_INDEX_INVENTORY,
  SET_INVENTORY,
  SET_LOADING,
} from 'ducks/actions';
import serverConfig from 'ducks/serverConfig';
import {server} from 'network/service';
import {
  arrayFind,
  getPropertyChanges,
  getItemDifference,
  getSpecificProperty,
} from 'utils/helper';
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
    yield put(SET_LOADING({status: true}));

    const config = yield serverConfig();
    const {res: pushResponse} = yield call(server.push, '/inventory/push', item, config);

    yield put(PUSH_INVENTORY({item: pushResponse}));
    yield onReport({
      action: 'ADD',
      module: 'inventory',
      reference: pushResponse,
    });

    yield put(SET_LOADING({status: false, message: 'push-item-resolve'}));
  } catch (err) {
    yield console.log('PUSH-INVENTORY-REJECT');
    if (!err.includes('jwt')) {
      yield put(SET_ERROR({inventory: err}));
      yield put(POP_INVENTORY({itemId: item.name}));
    }
  } finally {
    yield put(CLEAR_LOADING());
  }
}
function* setWorker(state) {
  try {
    yield put(SET_LOADING({status: true}));

    const config = yield serverConfig();
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

    const prevObj = getSpecificProperty(ITEM_PROPERTIES, peekResponse[0]);

    yield call(server.set, '/inventory/set', {...state.item, ...tempItem}, config);
    yield put(SET_INDEX_INVENTORY({item: tempItem}));

    /**
     * error report comes in deep object, suggest to use
     * @function getSpecificProperty
     */

    const newObj = getSpecificProperty(ITEM_PROPERTIES, {...state.item, ...tempItem});

    console.log('====>', prevObj, newObj);
    console.log('---->', getItemDifference(prevObj, newObj));

    const reference = getItemDifference(prevObj, newObj);
    yield onReport({
      action,
      module: 'inventory',
      reference,
    });
    yield put(SET_LOADING({status: false, message: 'set-item-resolve'}));
  } catch (err) {
    yield console.log('SET-INVENTORY-REJECT', err);
    if (!err.includes('jwt')) {
      yield put(SET_ERROR({inventory: err}));
    }
  } finally {
    yield put(CLEAR_LOADING());
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
  yield takeLatest(ACTION_TYPE('INVENTORY-REQ').PUSH, pushWorker);
  yield takeLatest(
    [
      ACTION_TYPE('INVENTORY-REQ').SET_INDEX,
      ACTION_TYPE('INVENTORY-RESTOCK-REQ').SET_INDEX,
    ],
    setWorker,
  );
  yield takeLatest(ACTION_TYPE('INVENTORY-REQ').POP, popWorker);
}
