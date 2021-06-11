import {Route} from 'react-router-dom';
import {Redirect} from 'react-router';

export default function RouteAuth({component: Component, redirectTo, isAuth, ...props}) {
  return (
    <Route
      strict
      sensitive
      render={(renderProps) =>
        isAuth ? <Component {...renderProps} /> : <Redirect to={{pathname: redirectTo}} />
      }
      {...props}
    ></Route>
  );
}
