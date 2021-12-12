import React, {Suspense} from 'react';
import ReactDom from 'react-dom';
import Loading from 'pages/Loading';
import App from 'App';
import './index.css';

require('dotenv').config();

ReactDom.render(
  <Suspense fallback={<Loading />}>
    <App />
  </Suspense>,
  document.getElementById('root'),
);
