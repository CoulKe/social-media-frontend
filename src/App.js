import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalStyles } from "./styles/Global";
import LoadingBlock from "./Components/LoadingBlock";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

//routes
import ProtectedRoutes from "./routes/protected";
import PublicRoutes from "./routes/public";

//pages
import NotFound from "./pages/Errors/404";
import * as authActions from "./actions/login";
import { checkNewChat } from "./actions/chatActions";
import { checkNewNotification } from "./actions/notificationActions";

/**Higher Order Component to check the logged in state. */
const AppRouter = ({
  component: Component,
  layout: Layout,
  requireAuth,
  isLogged,
  ...rest
}) => (
  <React.Suspense fallback={<LoadingBlock />}>
    <Route
      {...rest}
      render={(props) => {
        // Check if page is protected and redirect if user is not authenticated.
        if (requireAuth && !isLogged) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        } else {
          return (
            <Layout>
              <Component {...props} />
            </Layout>
          );
        }
      }}
    ></Route>
  </React.Suspense>
);

const App = () => {
  axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}`;
axios.defaults.withCredentials = true;
let accessToken = useRef(null);

// Response interceptor for API calls
axios.interceptors.response.use(
  (response) => {
    if (
      (response.config.url === "/refresh-tokens" ||
        response.config.url === "/login") &&
      response.data.hasOwnProperty("accessToken") && response.data.hasOwnProperty("refreshToken")
    ) {
      // Set access tokens in memory
      accessToken.current = response.data.accessToken;
      localStorage.setItem("refreshToken", response.data.refreshToken);
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
        accessToken.current = data.accessToken;
        localStorage.setItem("refreshToken", data.refreshToken);
      } catch (err) {
        localStorage.clear();
        return (window.location.pathname = "/login");
      }

      const apiToken = accessToken.current || "";
      axios.defaults.headers.Authorization = "Bearer " + apiToken;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);
axios.interceptors.request.use(async (req) => {
  const apiToken = accessToken.current;
  const refreshToken = localStorage.getItem('refreshToken');
  req.headers.Authorization = apiToken ? `Bearer: ${apiToken}` : "";
  req.headers.x_refresh = refreshToken ? `${refreshToken}` : "";
  req.headers.x_auth_username = localStorage.getItem('loggedUser') ? localStorage.getItem('loggedUser') : '';
  req.headers.x_auth_Id = localStorage.getItem('id') ? localStorage.getItem('id') : "";

  return req;
});

  const dispatch = useDispatch();
  // const location = useLocation();
  const { hasNew: hasNewNotification } = useSelector(
    (state) => state.notifications
    );
  const { hasNew: hasNewChat } = useSelector((state) => state.chats);
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("loggedUser") && localStorage.getItem("id")
      ? true
      : false
  );
  const { isLogged: authState } = useSelector((state) => state.login);
  useEffect(() => {
    async function fetchToken(){
      try{
      const { data } = await axios({
        url: "/refresh-tokens",
        method: "POST",
      });
      accessToken.current = data.accessToken;
    } catch (err) {
      localStorage.clear();
      return (window.location.pathname = "/login");
    }
  }
  if(isLogged && !accessToken.current && window.location.pathname !== "/register" && window.location.pathname !== "/login"){
    fetchToken();
  }
  }, [isLogged]);

  // Set initial login state after page load
  useEffect(() => {
    if (isLogged) {
      dispatch(authActions.confirmLogin());
    }
  }, [accessToken, dispatch, isLogged]);

  useEffect(() => {
    if (authState !== null) {
      setIsLogged(authState);
    }
  }, [dispatch, authState]);
  // Periodically check if there's a new chat.
  useEffect(() => {
    let messageTimer = setInterval(() => {
      if (isLogged && accessToken.current && !hasNewChat && window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/messages') {
        dispatch(checkNewChat());
      }
    }, 1000);

    return ()=>{
      clearInterval(messageTimer);
    }
  }, [accessToken, dispatch, hasNewChat, isLogged]);

  // Periodically check if there's a new notification.
  useEffect(() => {
    let  notificationTimer = setInterval(() => {
      if (isLogged && accessToken.current && !hasNewNotification && window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/notifications') {
        dispatch(checkNewNotification());
      }
    }, 1000);

    return ()=>{
      clearInterval(notificationTimer);
    }
  }, [accessToken, dispatch, hasNewNotification, isLogged]);

  // Watch for changes in localStorage
  useEffect(() => {
    const handler = () => {
      let confirmedLogin =
        localStorage.getItem("loggedUser") && localStorage.getItem("id")
          ? true
          : false;
      setIsLogged(confirmedLogin);
      if (confirmedLogin) {
        dispatch(authActions.confirmLogin());
      } else {
        dispatch(authActions.confirmLogout());
      }
    };
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("storage", handler);
    };
  }, [dispatch]);

  return (
    <Router>
      {/* <div className="offline-error-block">
      <p>You appear to be offline.</p>
      <div>
      <button>Cancel</button>
      <button>Ok</button>
      </div>
    </div> */}
      <GlobalStyles />
      <Switch>
        {PublicRoutes.map((route, index) => (
          <AppRouter
            key={index}
            path={route.path}
            exact
            component={route.page}
            layout={route.layout}
          />
        ))}

        {ProtectedRoutes.map((route, index) => (
          <AppRouter
            key={index}
            path={route.path}
            exact
            requireAuth={true}
            isLogged={isLogged}
            component={route.page}
            layout={route.layout}
          />
        ))}
        {/* 404 page */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
