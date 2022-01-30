import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSagas from './sagas';

import {createStore, applyMiddleware} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';

export const history = createBrowserHistory({basename: '/'});

export default function configStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer(history),
    applyMiddleware(sagaMiddleware, routerMiddleware(history)),
  );
  sagaMiddleware.run(rootSagas);
  return store;
}
