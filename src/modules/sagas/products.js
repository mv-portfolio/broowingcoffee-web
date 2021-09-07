import {ACTION_TYPE} from 'constants/strings';
import {SET_PRODUCTS} from 'modules/actions';
import serverConfig from 'modules/serverConfig';
import {server} from 'network/service';
import {call, put, takeEvery} from 'redux-saga/effects';

function* worker() {
  try {
    const config = yield serverConfig();
    const main = yield call(server.get, '/products/main', config);
    const addons = yield call(server.get, '/products/addons', config);

    yield put(
      SET_PRODUCTS({
        main: main.res,
        addons: addons.res,
      }),
    );
  } catch (err) {
    console.log('PRODUCTS-REJECT:', err);
  }
}

export default function* rootProductsSaga() {
  yield takeEvery(ACTION_TYPE('PRODUCTS').PEEK, worker);
}
