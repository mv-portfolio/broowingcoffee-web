import React, {Suspense} from 'react';
import ReactDom from 'react-dom';
import Loading from 'pages/Loading';
import App from 'App';

require('dotenv').config();

ReactDom.render(
  <Suspense fallback={<Loading />}>
    <App />
  </Suspense>,
  document.getElementById('root'),
);
