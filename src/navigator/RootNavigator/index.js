import {useEffect} from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import {pages} from './pages';

import SignIn from 'pages/SignIn';
import Dashboard from 'pages/Dashboard';
import PageNotExist from 'pages/PageNotExist';
import AssessmentAccount from 'pages/Assessment/Account';
import AssessmentInformation from 'pages/Assessment/Information';
import RouteAuth from 'components/RouteAuth';

export default function Navigator() {
  return (
    <Router basename='/'>
      <Switch>
        <Route component={SignIn} path='/sign-in' />
        <Route component={AssessmentInformation} path='/assessment-information' />
        <Route component={AssessmentAccount} path='/assessment-account' />
        <RouteAuth component={Dashboard} path='/' redirectTo='/sign-in' isAuth={false} />
      </Switch>
    </Router>
  );
}
