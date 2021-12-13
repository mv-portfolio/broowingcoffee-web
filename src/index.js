import React, {Suspense} from 'react';
import ReactDom from 'react-dom';
import Loading from 'pages/Loading';
import App from 'App';

if (process.env.NODE_ENV === 'production') {
  console.log = function () {
    return;
  };
}

require('dotenv').config();

ReactDom.render(
  <Suspense fallback={<Loading />}>
    <App />
  </Suspense>,
  document.getElementById('root'),
);
