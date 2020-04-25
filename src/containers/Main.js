import React from 'react';
import { connect } from "react-redux";
import { Switch, Route, Redirect, } from "react-router-dom";

import Header from '../components/Header';
import Sidebar from './Sidebar';
import Loader from '../components/Loader';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';
import { routes } from '../config/constants';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      loading: false,
      showMenu: true
    };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    let logInfo = {
      timeStamp: new Date(),
      stackTrace: info.componentStack,
      pageon: window.location.pathname,
      browserVersion1a: navigator.appVersion,
      env: process.env.REACT_APP_ENV
    }
    console.info('logInfo', logInfo);
    // logComponentStackToMyService(logInfo);
  }

  // for mobile version
  toggleMenu = () => {
    this.setState(prevState => ({ showMenu: !prevState.showMenu }));
  }

  render() {
    const { loading, showMenu } = this.state;
    if (this.state.hasError) {
      // render any custom fallback UI
      return <Redirect to={routes.APPLICATION_ERROR} />;
    }
    return <>
      {loading ? <Loader loading={loading} size='lg' /> :
        <>
          <Header toggleMenu={this.toggleMenu} />
          <div id="layoutSidenav">
            <Sidebar showMenu={showMenu} />
            <div id="layoutSidenav_content">
              <Switch>
                <Route exact path={routes.MAIN}>
                  <Dashboard />
                </Route>
                <Route exact path={routes.DASHBOARD}>
                  <Dashboard />
                </Route>
              </Switch>
              <Footer />
            </div>
          </div>
        </>}
    </>;
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
