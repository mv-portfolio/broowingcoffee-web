import PageError from 'pages/PageError';
import Loading from 'pages/Loading';
import {Route} from 'react-router-dom';

export default function RoutePrivate({auth, error, component: Component, ...props}) {
  const isAuthenticated = routeProps => {
    if (error.server || error.request || error.page) return <PageError />;
    if (typeof auth.authenticated !== 'boolean') return <Loading />;
    return <Component {...routeProps} />;
  };

  return <Route {...props} render={routeProps => isAuthenticated(routeProps)} />;
}
