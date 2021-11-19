import {ACTION_TYPE} from 'constants/strings';
import {CLEAR_PURCHASING_PRODUCTS, SET_ERROR, SET_PRODUCTS} from 'modules/actions';
import serverConfig from 'modules/serverConfig';
import {server} from 'network/service';
import {call, put, takeLatest} from 'redux-saga/effects';
import {arrayFind, getObjectChanges} from 'utils/helper';
import {onReport} from './reports';

function* peekWorker() {
  try {
    const config = yield serverConfig();
    const main = yield call(server.peek, '/products/main', config);
    const addons = yield call(server.peek, '/products/addons', config);

    yield put(
      SET_PRODUCTS({
        main: main.res,
        addons: addons.res,
      }),
    );

    yield console.log('PEEK-PRODUCTS-RESOLVE');
  } catch (err) {
    yield console.log('PEEK-PRODUCTS-REJECT:');
  }
}
function* pushWorker(state) {
  try {
    const config = yield serverConfig();

    let chunks = {
      path: 'addons',
      payload: state.addonProduct,
    };

    if (state.mainProduct) chunks = {path: 'main', payload: state.mainProduct};
    const {res: pushResponse} = yield call(
      server.push,
      `/products/${chunks.path}/push`,
      chunks.payload,
      config,
    );
    yield peekWorker();

    yield onReport({
      action: 'ADD',
      module: `products/${chunks.path}`,
      reference: pushResponse,
    });

    yield console.log('PUSH-PRODUCTS-RESOLVE');
  } catch (err) {
    yield console.log('PUSH-PRODUCTS-REJECT');
    yield put(SET_ERROR({product: err}));
  }
}
function* setWorker(state) {
  try {
    yield put(CLEAR_PURCHASING_PRODUCTS());
    const config = yield serverConfig();

    let chunks = {
      path: 'addons',
      name: '',
    };

    if (state.mainId) chunks = {path: 'main', name: state.mainId};
    const {res: peekResponse} = yield call(server.peek, `/products/${chunks.path}`, {
      ...config,
      params: {
        name: chunks.name,
      },
    });
    console.log(peekResponse[0], state.payload);
    const reference = getObjectChanges(peekResponse[0], state.payload);
    yield onReport({
      action: 'UPDATE',
      module: `products/${chunks.path}`,
      reference,
    });

    yield call(server.set, `/products/${chunks.path}/set`, state.payload, config);

    yield console.log('SET-PRODUCTS-RESOLVE');
  } catch (err) {
    yield console.log('PUSH-PRODUCTS-REJECT', err);
    yield put(SET_ERROR({product: err}));
  }
}
function* popWorker(state) {
  try {
    yield put(CLEAR_PURCHASING_PRODUCTS());
    const config = yield serverConfig();

    let chunks = {
      path: 'addons',
      name: state.addonId,
    };

    if (state.mainId) chunks = {path: 'main', name: state.mainId};

    const {res: peekResponse} = yield call(server.peek, `/products/${chunks.path}`, {
      ...config,
      params: {
        name: chunks.name,
      },
    });
    yield onReport({
      action: 'DELETE',
      module: `products/${chunks.path}`,
      reference: peekResponse[0],
    });

    yield call(server.pop, `/products/${chunks.path}/pop`, {name: chunks.name}, config);

    yield console.log('POP-PRODUCTS-RESOLVE');
  } catch (err) {
    yield console.log('POP-PRODUCTS-REJECT');
  }
}

export default function* rootProductsSaga() {
  yield takeLatest(ACTION_TYPE('PRODUCTS').PEEK, peekWorker);
  yield takeLatest(ACTION_TYPE('PRODUCTS').SET_INDEX, setWorker);
  yield takeLatest(ACTION_TYPE('PRODUCTS').PUSH, pushWorker);
  yield takeLatest(ACTION_TYPE('PRODUCTS').POP, popWorker);
}
