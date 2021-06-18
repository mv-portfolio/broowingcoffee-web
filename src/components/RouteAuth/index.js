import {Route} from 'react-router-dom';
import PageError from 'pages/PageError';
import Loading from 'pages/Loading';

export default function RouteAuth({
  rederAuthComponent: AuthComponent,
  renderNonAuthComponent: NonAuthComponent,
  error,
  auth,
  ...props
}) {
  const isAuthenticated = (auth, renderProps) => {
    if (error.name) return <PageError />;
    if (typeof auth.authenticated !== 'boolean') return <Loading />;

    return auth.authenticated ? (
      <AuthComponent {...renderProps} />
    ) : (
      <NonAuthComponent {...renderProps} />
    );
  };

  return (
    <Route
      strict
      sensitive
      render={renderProps => isAuthenticated(auth, renderProps)}
      {...props}
    />
  );
}
