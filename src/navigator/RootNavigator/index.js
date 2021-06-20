import {lazy, useEffect} from 'react';
import {connect} from 'react-redux';
import {Switch} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import {RouteAuth, RoutePrivate} from 'components';
import {REQUEST_APP_AUTH} from 'hooks/global/redux/actions';
import {pages} from './pages';

const Dashboard = lazy(() => import('pages/Dashboard'));
const SignIn = lazy(() => import('pages/SignIn'));

function RootNavigator({auth, history, error, dispatch}) {
  useEffect(() => {
    dispatch(REQUEST_APP_AUTH());
  }, [dispatch]);
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <RouteAuth
          path='/'
          auth={auth}
          error={error}
          exact={true}
          rederAuthComponent={Dashboard}
          renderNonAuthComponent={SignIn}
        />
        {pages.map((page, index) => (
          <RoutePrivate key={index} {...page} />
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
