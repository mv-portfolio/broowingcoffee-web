import {Route} from 'react-router-dom';

export default function RouteAuth({
  rederAuthComponent: AuthComponent,
  renderNonAuthComponent: NonAuthComponent,
  isAuth,
  ...props
}) {
  return (
    <Route
      strict
      sensitive
      render={(renderProps) =>
        isAuth ? <AuthComponent {...renderProps} /> : <NonAuthComponent {...renderProps} />
      }
      {...props}
    ></Route>
  );
}
