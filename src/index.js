import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import allReducers from "./reducers";
import { Provider } from "react-redux";
import * as authTypes from "./ActionTypes/loginTypes";

// Check if it's development and enable redux dev tools if it is installed.
const enhancer =
  process.env.NODE_ENV === "development" &&
  typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "function"
    ? compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__())
    : compose(applyMiddleware(thunk));

const rootReducer = (state, action) => {
  if (action.type === authTypes.LOGGED_OUT) {
    return allReducers(undefined, action);
  }

  return allReducers(state, action);
};

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
