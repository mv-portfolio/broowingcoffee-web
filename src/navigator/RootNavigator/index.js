import {useEffect} from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import {VERSION, BUILD_STATE} from 'config/env';
import {pages} from './pages';

import RouteAuth from 'components/RouteAuth';
import Dashboard from 'pages/Dashboard';
import SignIn from 'pages/SignIn';

export default function Navigator() {
  useEffect(() => {
    console.log(VERSION);
    console.log(BUILD_STATE);
  }, []);

  return (
    <Router basename='/'>
      <Switch>
        <RouteAuth
          path='/'
          exact
          isAuth={true}
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
