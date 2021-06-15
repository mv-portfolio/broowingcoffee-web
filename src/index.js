import React from 'react';
import ReactDom from 'react-dom';
import RootNavigator from 'navigator/RootNavigator';
import configStore, {history} from 'hooks/global/redux';
import './.module.css';

import {ConnectedRouter} from 'connected-react-router';
import {Provider} from 'react-redux';

const store = configStore();

ReactDom.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <RootNavigator />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
