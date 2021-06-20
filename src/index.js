import React, {Suspense} from 'react';
import ReactDom from 'react-dom';
import RootNavigator from 'navigator/RootNavigator';
import configStore, {history} from 'hooks/global/redux';
import Loading from 'pages/Loading';
import './.module.css';

import {Provider} from 'react-redux';

const store = configStore();

ReactDom.render(
  <Suspense fallback={<Loading planeBackground />}>
    <Provider store={store}>
      <RootNavigator history={history} />
    </Provider>
  </Suspense>,
  document.getElementById('root'),
);
