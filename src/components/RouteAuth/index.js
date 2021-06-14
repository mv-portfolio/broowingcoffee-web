import {Route} from 'react-router-dom';
import PageError from 'pages/PageError';
import Loading from 'pages/Loading';

export default function RouteAuth({
  rederAuthComponent: AuthComponent,
  renderNonAuthComponent: NonAuthComponent,
  authentication,
  error,
  ...props
}) {
  const isAuthenticated = (authentication, renderProps) => {
    if (error.name) return <PageError title={error.name} />;
    if (!authentication.status) return <Loading />;
    return authentication.status ? (
      <AuthComponent {...renderProps} />
    ) : (
      <NonAuthComponent {...renderProps} />
    );
  };

  return (
    <Route
      strict
      sensitive
      render={renderProps => isAuthenticated(authentication, renderProps)}
      {...props}
    />
  );
}
