import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import 'core-js';
import "regenerator-runtime/runtime.js";

import store from './middleware/Store';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "./style/styles.css";
import "./style/all.min.css";
import "./style/custom.css";
import "toastr/build/toastr.css";

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
