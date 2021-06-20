import {Route} from 'react-router-dom';
import PageError from 'pages/PageError';
import Loading from 'pages/Loading';

export default function RouteAuth({
  auth,
  error,
  rederAuthComponent: AuthComponent,
  renderNonAuthComponent: NonAuthComponent,
  ...props
}) {
  const isAuthenticated = (auth, routeProps) => {
    if (error.name) return <PageError />;
    if (typeof auth.authenticated !== 'boolean') return <Loading />;

    return auth.authenticated ? (
      <AuthComponent {...routeProps} />
    ) : (
      <NonAuthComponent {...routeProps} />
    );
  };

  return (
    <Route
      {...props}
      render={routeProps => isAuthenticated(auth, routeProps)}
    />
  );
}
