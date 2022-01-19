import {ACTION_TYPE} from 'constants/strings';
import {
  CLEAR_LOADING,
  PUSH_DISCOUNT,
  SET_DISCOUNTS,
  SET_ERROR,
  SET_INDEX_DISCOUNTS,
  SET_LOADING,
} from 'ducks/actions';
import discounts from 'ducks/reducers/discounts';
import serverConfig from 'ducks/serverConfig';
import {server} from 'network/service';
import {takeLatest, call, put} from 'redux-saga/effects';
import {getPropertyChanges} from 'utils/helper';
import {onReport} from './reports';

function* peekWorker() {
  try {
    const configs = yield serverConfig();
    const {res: discounts} = yield call(server.peek, '/discounts', {...configs});
    yield put(SET_DISCOUNTS({discounts}));
    yield console.log('PEEK-DISCOUNTS-RESOLVE');
  } catch (err) {
    yield console.log('PEEK-DISCOUNTS-REJECT');
  }
}
function* pushWorker(state) {
  const {discount} = state;
  try {
    yield put(SET_LOADING({status: true}));

    const configs = yield serverConfig();
    const {res: newDiscount} = yield call(server.push, '/discounts/push', discount, {
      ...configs,
    });

    yield put(
      PUSH_DISCOUNT({
        discount: {
          _id: newDiscount._id,
          name: newDiscount.name,
          value: newDiscount.value,
        },
      }),
    );

    yield onReport({
      action: 'ADD',
      module: 'discount',
      reference: {
        name: `${discount.name} ${discount.value}%`,
      },
    });

    yield put(SET_LOADING({status: false, message: 'push-discounts-resolve'}));
  } catch (err) {
    yield console.log('PUSH-DISCOUNTS-REJECT', err);
    yield put(SET_ERROR({discount: err}));
  } finally {
    yield put(CLEAR_LOADING());
  }
}
function* setWorker(state) {
  const {discount} = state;
  try {
    yield put(SET_LOADING({status: true}));
    const configs = yield serverConfig();

    const {res: peekResponse} = yield call(server.peek, '/discounts', {
      params: {
        _id: discount._id,
      },
      ...configs,
    });
    yield call(server.set, '/discounts/set', discount, {...configs});

    yield put(SET_INDEX_DISCOUNTS({discount}));
    yield put(SET_LOADING({status: false, message: 'set-discounts-resolve'}));

    const reference = getPropertyChanges(peekResponse[0], discount);
    yield onReport({
      module: 'discount',
      action: 'UPDATE',
      reference,
    });
  } catch (err) {
    yield console.log('SET-DISCOUNTS-REJECT', err);
  } finally {
    yield put(CLEAR_LOADING());
  }
}
function* popWorker(state) {
  const {discount} = state;
  try {
    const configs = yield serverConfig();
    yield call(server.pop, '/discounts/pop', {...discount}, {...configs});

    yield onReport({
      action: 'DELETE',
      module: 'discount',
      reference: {
        name: `${discount.name} ${discount.value}%`,
      },
    });
  } catch (err) {
    yield console.log('POP-DISCOUNTS-REJECT', err);
  }
}

export default function* rootDiscountsSaga() {
  yield takeLatest(ACTION_TYPE('DISCOUNTS').PEEK, peekWorker);
  yield takeLatest(ACTION_TYPE('DISCOUNTS-REQ').PUSH, pushWorker);
  yield takeLatest(ACTION_TYPE('DISCOUNTS-REQ').SET_INDEX, setWorker);
  yield takeLatest(ACTION_TYPE('DISCOUNTS').POP, popWorker);
}
