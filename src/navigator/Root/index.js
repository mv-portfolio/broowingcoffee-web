import {lazy, useEffect} from 'react';
import {connect} from 'react-redux';
import {Switch} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import {RouteAuth, RoutePrivate} from 'components';
import {APP_AUTH} from 'modules/actions';
import {pages} from './pages';

const DashboardNavigator = lazy(() => import('navigator/Dashboard'));
const SignIn = lazy(() => import('pages/SignIn'));

function RootNavigator({auth, history, error, dispatch}) {
  useEffect(() => {
    dispatch(APP_AUTH());
  }, [dispatch]);

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <RouteAuth
          path='/'
          auth={auth}
          error={error}
          exact={auth.authenticated ? false : true}
          rederAuthComponent={DashboardNavigator}
          renderNonAuthComponent={SignIn}
        />
        {pages.map((page, index) => (
          <RoutePrivate key={index} auth={auth} error={error} {...page} />
        ))}
      </Switch>
    </ConnectedRouter>
  );
}

const stateProps = ({auth, error}) => ({
  auth,
  error,
});

const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(stateProps, dispatchProps)(RootNavigator);
