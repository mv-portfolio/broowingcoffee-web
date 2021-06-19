import PageError from 'pages/PageError';

import {connect} from 'react-redux';
import {Route} from 'react-router-dom';

function RoutePrivate({auth, component: Component}) {
  const isAuthenticated = routeProps => {
    if (typeof auth.authenticated !== 'boolean') {
      return <PageError />;
    }
    return <Component {...routeProps} />;
  };

  return <Route render={routeProps => isAuthenticated(routeProps)} />;
}

const stateProps = ({auth}) => ({
  auth,
});
export default connect(stateProps)(RoutePrivate);
