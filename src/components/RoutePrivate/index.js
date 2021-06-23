import PageError from 'pages/PageError';

import {connect} from 'react-redux';
import {Route} from 'react-router-dom';

function RoutePrivate({auth, component: Component, ...props}) {
  const isAuthenticated = routeProps => {
    if (typeof auth.authenticated !== 'boolean') {
      return <PageError />;
    }
    return <Component {...routeProps} />;
  };

  return (
    <Route {...props} render={routeProps => isAuthenticated(routeProps)} />
  );
}

const stateProps = ({auth}) => ({
  auth,
});
export default connect(stateProps)(RoutePrivate);
