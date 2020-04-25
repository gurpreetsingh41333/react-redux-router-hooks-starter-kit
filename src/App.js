import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import loadable from '@loadable/component';

import Login from './containers/Login/Login';
import NoMatch from './components/NoMatch';
import Loader from './components/Loader';
import ApplicationError from './components/ErrorPages/ApplicationError';
import { routes } from './config/constants';

const Main = loadable(() => import(/* webpackChunkName: "Main" */
  './containers/Main'), {
  fallback: <Loader loading={true} size='lg' />
})

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute = ({ children, ...rest }) => {
  let isAuthenticated = localStorage.getItem('isAuthenticated');
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated === "true" ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: routes.LOGIN,
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

const App = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path={routes.MAIN}>
          <Main />
        </PrivateRoute>
        <PrivateRoute path={routes.APP}>
          <Main />
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path={routes.APPLICATION_ERROR}>
          <ApplicationError />
        </Route>
        <Route path={routes.NO_MATCH}>
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
