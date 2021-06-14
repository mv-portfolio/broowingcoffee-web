import RouteAuth from 'components/RouteAuth';
import Dashboard from 'pages/Dashboard';
import SignIn from 'pages/SignIn';

import {useEffect} from 'react';
import {connect} from 'react-redux';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import {REQUEST_APP_AUTH} from 'hooks/global/redux/actions';
import {pages} from './pages';

function RootNavigator({dispatch, auth, error}) {
  useEffect(() => {
    dispatch(REQUEST_APP_AUTH());
  }, [dispatch]);

  return (
    <Router basename='/'>
      <Switch>
        <RouteAuth
          exact
          path='/'
          error={error}
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

const stateProps = ({auth, products, error}) => ({
  auth,
  products,
  error,
});

const dispatch = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(stateProps, dispatch)(RootNavigator);
