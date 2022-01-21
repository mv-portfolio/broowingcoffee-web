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
import {arrayFind, getItemDifferences, getSpecificProperty} from 'utils/helper';
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
    const items = yield select(state => state.inventory.items);
    const item = arrayFind(items, {name: state.item.name});
    let tempItem = state.item;
    let action = 'UPDATE';

    if (state.type.includes('RESTOCK')) {
      tempItem.quantity += item.quantity;
      action = 'RESTOCK';
    }

    const prevObj = getSpecificProperty(ITEM_PROPERTIES, item);

    yield call(server.set, '/inventory/set', {...state.item, ...tempItem}, config);
    yield put(SET_INDEX_INVENTORY({item: tempItem}));

    /**
     * error report comes in deep object, suggest to use
     * @function getSpecificProperty
     */

    const newObj = getSpecificProperty(ITEM_PROPERTIES, {...state.item, ...tempItem});

    const reference = getItemDifferences(prevObj, newObj);
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
    yield put(SET_LOADING({status: true}));

    const config = yield serverConfig();
    yield call(server.pop, '/inventory/pop', {name: state.item.name}, config);

    yield onReport({
      action: 'DELETE',
      module: 'inventory',
      reference: {
        name: state.item.name,
      },
    });

    yield put(SET_LOADING({status: false, message: 'pop-item-resolve'}));
  } catch (err) {
    yield console.log('POP-INVENTORY-REJECT', err);
    // if (!err.includes('jwt')) {
    //   yield put(SET_ERROR({inventory: err}));
    // }
  } finally {
    yield put(CLEAR_LOADING());
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
  yield takeLatest(ACTION_TYPE('INVENTORY').POP, popWorker);
}
