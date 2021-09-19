import {ACTION_TYPE} from 'constants/strings';
import {SET_PRODUCTS} from 'modules/actions';
import serverConfig from 'modules/serverConfig';
import {server} from 'network/service';
import {call, put, takeEvery} from 'redux-saga/effects';

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
  } catch (err) {
    yield console.log('PEEK-PRODUCTS-REJECT:', err);
  }
}
function* pushWorker(state) {
  try {
    const config = yield serverConfig();
    if (state.mainProduct) {
      yield call(server.push, '/products/main/push', state.mainProduct, config);
    } else {
      yield call(server.push, '/products/addons/push', state.addonProduct, config);
    }

    yield console.log('PUSH-PRODUCTS-RESOLVE', state);
  } catch (err) {
    yield console.log('PUSH-PRODUCTS-REJECT:', err);
  }
}

function* setWorker(state) {
  try {
    const config = yield serverConfig();
    if (state.mainId) {
      yield call(server.set, '/products/main/set', state.payload, config);
    } else {
      yield call(server.set, '/products/addons/set', state.payload, config);
    }
    yield console.log('SET-PRODUCTS-RESOLVE', state);
  } catch (err) {
    yield console.log('PUSH-PRODUCTS-REJECT:', err);
  }
}

function* popWorker(state) {
  try {
    const config = yield serverConfig();
    if (state.mainId) {
      yield call(server.pop, '/products/main/pop', {name: state.mainId}, config);
    } else {
      yield call(server.pop, '/products/addons/pop', {name: state.addonId}, config);
    }

    yield console.log('POP-PRODUCTS-RESOLVE', state);
  } catch (err) {
    yield console.log('POP-PRODUCTS-REJECT', err);
  }
}

export default function* rootProductsSaga() {
  yield takeEvery(ACTION_TYPE('PRODUCTS').PEEK, peekWorker);
  yield takeEvery(ACTION_TYPE('PRODUCTS').SET_INDEX, setWorker);
  yield takeEvery(ACTION_TYPE('PRODUCTS').PUSH, pushWorker);
  yield takeEvery(ACTION_TYPE('PRODUCTS').POP, popWorker);
}
