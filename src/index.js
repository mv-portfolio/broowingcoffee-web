import React from 'react';
import ReactDom from 'react-dom';
import configStore from 'hooks/global/redux';
import App from './App';

import {Provider} from 'react-redux';

const store = configStore();

ReactDom.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
