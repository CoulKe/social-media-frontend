import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import allReducers from "./reducers";
import { Provider } from "react-redux";
import { LOG_OUT } from "./ActionTypes/authTypes";

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}`;
axios.defaults.withCredentials = true;
let accessToken;

// Response interceptor for API calls
axios.interceptors.response.use(
  (response) => {
    if (
      (response.config.url === "/refresh-tokens" ||
        response.config.url === "/login") &&
      response.data.hasOwnProperty("accessToken")
    ) {
      // Set access tokens in memory
      accessToken = response.data.accessToken;
    }
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    // Retry the request once.
    if (error?.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios({
          url: "/refresh-tokens",
          method: "POST",
        });
        accessToken = data.accessToken;
      } catch (err) {
        return (window.location.pathname = "/login");
      }

      const apiToken = accessToken || "";
      axios.defaults.headers.Authorization = "Bearer " + apiToken;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);
axios.interceptors.request.use(async (req) => {
  const apiToken = accessToken;
  req.headers.Authorization = apiToken ? `Bearer: ${apiToken}` : "";

  return req;
});

// Check if it's development and enable redux dev tools if it is installed.
const enhancer =
  process.env.NODE_ENV === "development" &&
  typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "function"
    ? compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__())
    : compose(applyMiddleware(thunk));

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
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
