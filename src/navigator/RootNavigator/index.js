import RouteAuth from 'components/RouteAuth';
import Dashboard from 'pages/Dashboard';
import SignIn from 'pages/SignIn';

import {useEffect, useState} from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import {pages} from './pages';

export default function Navigator() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {}, []);

  return (
    <Router basename='/'>
      <Switch>
        <RouteAuth
          exact
          path='/'
          authentication={auth}
          rederAuthComponent={Dashboard}
          renderNonAuthComponent={SignIn}
        />
        {pages.map((page, index) => (
          <Route key={index} {...page} />
        ))}
      </Switch>
    </Router>
  );
}
