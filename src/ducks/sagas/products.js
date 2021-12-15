import {ACTION_TYPE} from 'constants/strings';
import {
  CLEAR_PURCHASING_PRODUCTS,
  PUSH_PRODUCT,
  SET_ERROR,
  SET_INDEX_PRODUCTS,
  SET_LOADING,
  SET_PRODUCTS,
} from 'ducks/actions';
import serverConfig from 'ducks/serverConfig';
import {server} from 'network/service';
import {all, call, put, takeLatest} from 'redux-saga/effects';
import {getPropertyChanges} from 'utils/helper';
import {onReport} from './reports';

function* peekWorker() {
  try {
    const config = yield serverConfig();
    const [main, addons] = yield all([
      call(server.peek, '/products/main', config),
      call(server.peek, '/products/addons', config),
    ]);

    yield put(
      SET_PRODUCTS({
        main: main.res,
        addons: addons.res,
      }),
    );

    yield console.log('PEEK-PRODUCTS-RESOLVE');
  } catch (err) {
    yield console.log('PEEK-PRODUCTS-REJECT', err);
  }
}
function* pushWorker(state) {
  try {
    const config = yield serverConfig();

    let chunks = {
      path: 'addons',
      payload: state.addonProduct,
    };

    yield put(SET_LOADING({status: true}));

    if (state.mainProduct) chunks = {path: 'main', payload: state.mainProduct};
    const {res: pushResponse} = yield call(
      server.push,
      `/products/${chunks.path}/push`,
      chunks.payload,
      config,
    );
    
    yield put(
      PUSH_PRODUCT(
        chunks.path === 'addons'
          ? {addonProduct: chunks.payload}
          : {mainProduct: chunks.payload},
      ),
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
    if (!err.includes('jwt')) {
      yield put(SET_ERROR({product: err}));
    }
  } finally {
    yield put(SET_LOADING({status: false, message: 'done'}));
  }
}
function* setWorker(state) {
  try {
    yield put(CLEAR_PURCHASING_PRODUCTS());
    const config = yield serverConfig();

    let chunks = {
      path: 'addons',
      name: state.addonId,
    };

    yield put(SET_LOADING({status: true}));

    if (state.mainId) chunks = {path: 'main', name: state.mainId};
    yield call(server.set, `/products/${chunks.path}/set`, state.payload, config);

    const {res: peekResponse} = yield call(server.peek, `/products/${chunks.path}`, {
      ...config,
      params: {name: chunks.name},
    });
    const reference = getPropertyChanges(peekResponse[0], state.payload);
    yield onReport({
      action: 'UPDATE',
      module: `products/${chunks.path}`,
      reference,
    });

    yield put(
      SET_INDEX_PRODUCTS(
        chunks.path === 'addons'
          ? {addonId: chunks.name, payload: state.payload}
          : {mainId: chunks.name, payload: state.payload},
      ),
    );

    yield console.log('SET-PRODUCTS-RESOLVE');
  } catch (err) {
    yield console.log('PUSH-PRODUCTS-REJECT', err);
    if (!err.includes('jwt')) {
      yield put(SET_ERROR({product: err}));
    }
  } finally {
    yield put(SET_LOADING({status: false, message: 'done'}));
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
  yield takeLatest(ACTION_TYPE('PRODUCTS-REQ').PUSH, pushWorker);
  yield takeLatest(ACTION_TYPE('PRODUCTS-REQ').SET_INDEX, setWorker);
  yield takeLatest(ACTION_TYPE('PRODUCTS').POP, popWorker);
}
