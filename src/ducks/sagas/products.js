import {ACTION_TYPE} from 'constants/strings';
import {
  CLEAR_LOADING,
  POP_PRODUCT,
  PUSH_PRODUCT,
  SET_ERROR,
  SET_INDEX_PRODUCTS,
  SET_LOADING,
  SET_PRODUCTS,
} from 'ducks/actions';
import serverConfig from 'ducks/serverConfig';
import {server} from 'network/service';
import {call, put, select, takeLatest} from 'redux-saga/effects';
import {arrayFind, getProductDifferences, getSpecificProperty} from 'utils/helper';
import {onReport} from './reports';

function* peekWorker() {
  try {
    const config = yield serverConfig();
    const {res: products} = yield call(server.peek, '/products', config);

    yield put(SET_PRODUCTS({products}));
    yield console.log('PEEK-PRODUCTS-RESOLVE');
  } catch (err) {
    yield console.log('PEEK-PRODUCTS-REJECT');
  }
}
function* pushWorker(state) {
  try {
    yield put(SET_LOADING({status: true}));

    const config = yield serverConfig();
    const {res: product} = yield call(
      server.push,
      '/products/push',
      state.product,
      config,
    );

    yield put(PUSH_PRODUCT({product}));
    yield onReport({
      action: 'ADD',
      module: 'products',
      reference: product,
    });

    yield put(SET_LOADING({status: false, message: 'push-product-resolve'}));
  } catch (err) {
    yield console.log('PUSH-PRODUCTS-REJECT');
    if (!err.includes('jwt')) {
      yield put(SET_ERROR({product: err}));
    }
  } finally {
    yield put(CLEAR_LOADING());
  }
}
function* setWorker(state) {
  try {
    yield put(SET_LOADING({status: true}));

    const config = yield serverConfig();
    const {products} = yield select(state => state.products);
    const product = yield arrayFind(products, {name: state.product.name});
    const prevProduct = getSpecificProperty(['name', 'based', 'consumed'], product);

    yield call(server.set, '/products/set', state.product, config);
    yield put(SET_INDEX_PRODUCTS({product: state.product}));

    const presProduct = getSpecificProperty(['name', 'based', 'consumed'], state.product);

    yield onReport({
      action: 'UPDATE',
      module: 'products',
      reference: getProductDifferences(prevProduct, presProduct),
    });

    yield put(SET_LOADING({status: false, message: 'set-product-resolve'}));
  } catch (err) {
    yield console.log('SET-PRODUCTS-REJECT', err);
    if (!err.includes('jwt')) {
      yield put(SET_ERROR({product: err}));
    }
  } finally {
    yield put(CLEAR_LOADING());
  }
}
function* popWorker(state) {
  try {
    yield put(SET_LOADING({status: true}));

    const config = yield serverConfig();
    yield call(server.pop, '/products/pop', state.product, config);

    yield onReport({
      action: 'DELETE',
      module: 'products',
      reference: {
        name: state.product.name,
      },
    });

    yield put(SET_LOADING({status: false, message: 'pop-product-resolve'}));
  } catch (err) {
    yield console.log('POP-PRODUCTS-REJECT', err);
    if (!err.includes('jwt')) {
      yield put(SET_ERROR({product: err}));
    }
  } finally {
    yield put(CLEAR_LOADING());
  }
}

export default function* rootProductsSaga() {
  yield takeLatest(ACTION_TYPE('PRODUCTS').PEEK, peekWorker);
  yield takeLatest(ACTION_TYPE('PRODUCTS-REQ').PUSH, pushWorker);
  yield takeLatest(ACTION_TYPE('PRODUCTS-REQ').SET_INDEX, setWorker);
  yield takeLatest(ACTION_TYPE('PRODUCTS').POP, popWorker);
}
