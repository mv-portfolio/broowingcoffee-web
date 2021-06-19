import {lazy, useEffect} from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import {RouteAuth, RoutePrivate} from 'components';
import {REQUEST_APP_AUTH} from 'hooks/global/redux/actions';
import {pages} from './pages';

const Dashboard = lazy(() => import('pages/Dashboard'));
const SignIn = lazy(() => import('pages/SignIn'));

function RootNavigator({auth, error, dispatch}) {
  useEffect(() => {
    dispatch(REQUEST_APP_AUTH());
  }, [dispatch]);
  return (
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
