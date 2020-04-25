import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";

import rootReducer from "../reducers";


export const history = createBrowserHistory();

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
