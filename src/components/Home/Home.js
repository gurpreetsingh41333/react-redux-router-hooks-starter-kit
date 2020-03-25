import React from 'react';

import UserList from '../../containers/UserList';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // static getDerivedStateFromError(error) {
  //   // Update state so the next render will show the fallback UI.
  //   return { hasError: true };
  // }

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

  render() {
    if (this.state.hasError) {
      // render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return <UserList />;
  }
}

export default Home;
