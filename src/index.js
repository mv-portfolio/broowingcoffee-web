import React, {Suspense} from 'react';
import ReactDom from 'react-dom';
import RootNavigator from 'navigator/RootNavigator';
import configStore, {history} from 'hooks/global/redux';
import Loading from 'pages/Loading';
import './.module.css';

import {ConnectedRouter} from 'connected-react-router';
import {Provider} from 'react-redux';

const store = configStore();

ReactDom.render(
  <Suspense fallback={<Loading planeBackground />}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <RootNavigator />
      </ConnectedRouter>
    </Provider>
  </Suspense>,
  document.getElementById('root'),
);
