import {Route} from 'react-router-dom';
import Loading from 'pages/Loading';

export default function RouteAuth({
  rederAuthComponent: AuthComponent,
  renderNonAuthComponent: NonAuthComponent,
  authentication,
  ...props
}) {
  const isAuthenticated = (authentication, renderProps) => {
    if (!authentication) return <Loading />;
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
      render={(renderProps) => isAuthenticated(authentication, renderProps)}
      {...props}
    />
  );
}
