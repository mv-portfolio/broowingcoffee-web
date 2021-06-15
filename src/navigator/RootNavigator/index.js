import RouteAuth from 'components/RouteAuth';
import Dashboard from 'pages/Dashboard';
import SignIn from 'pages/SignIn';

import {useEffect} from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import {REQUEST_APP_AUTH} from 'hooks/global/redux/actions';
import {pages} from './pages';

function RootNavigator({dispatch, auth, error}) {
  useEffect(() => {
    dispatch(REQUEST_APP_AUTH());
  }, [dispatch]);
  return (
    <Switch>
      <RouteAuth
        exact
        path='/'
        auth={auth}
        error={error}
        rederAuthComponent={Dashboard}
        renderNonAuthComponent={SignIn}
      />
      {pages.map((page, index) => (
        <Route key={index} {...page} />
      ))}
    </Switch>
  );
}

const stateProps = ({auth, products, error}) => ({
  auth,
  products,
  error,
});

const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(stateProps, dispatchProps)(RootNavigator);
