import RouteAuth from 'components/RouteAuth';
import Dashboard from 'pages/Dashboard';
import SignIn from 'pages/SignIn';
import configStore from 'hooks/global/redux';

import {useEffect} from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {pages} from './pages';

export default function Navigator() {
  const store = configStore();
  // const [auth, setAuth] = useState(null);

  useEffect(() => {}, []);

  return (
    <Provider store={store}>
      <Router basename='/'>
        <Switch>
          <RouteAuth
            exact
            path='/'
            authentication={true}
            rederAuthComponent={Dashboard}
            renderNonAuthComponent={SignIn}
          />
          {pages.map((page, index) => (
            <Route key={index} {...page} />
          ))}
        </Switch>
      </Router>
    </Provider>
  );
}
