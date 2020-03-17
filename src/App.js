import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import loadable from '@loadable/component';

import Login from './components/Login/Login';
import './App.css';
import NoMatch from './components/NoMatch/NoMatch';

const Home = loadable(props => import(/* webpackChunkName: "Home" */
 /* webpackPrefetch: true */ './components/Home/Home'), {
  fallback: <div>Loading...</div>
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
                pathname: "/login",
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
    <div className="container">
      <Router>
        <Switch>
          <Route path="/public">
            <h3>Public</h3>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute exact path="/home">
            <Home />
          </PrivateRoute>
          <Route path="/">
            <Login />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
