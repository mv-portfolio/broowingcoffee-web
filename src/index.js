import React, {Suspense} from 'react';
import ReactDom from 'react-dom';
import Loading from 'pages/Loading';
import App from 'App';
import './index.css';

ReactDom.render(
  <Suspense fallback={<Loading planeBackground />}>
    <App />
  </Suspense>,
  document.getElementById('root'),
);
