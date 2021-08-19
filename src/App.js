import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalStyles } from "./styles/Global";
import LoadingBlock from "./Components/LoadingBlock";
import {BrowserRouter as Router,Route, Switch, Redirect} from "react-router-dom";

//routes
import ProtectedRoutes from "./routes/protected";
import PublicRoutes from "./routes/public";

//pages
import NotFound from "./pages/Errors/404";
import * as authActions from "./actions/login";

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
                  host: window.location.host,
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
  const dispatch = useDispatch();
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("loggedUser") && localStorage.getItem("id")
      ? true
      : false
  );


  // Set initial login state after page load
  useEffect(() => {
    isLogged ? dispatch(authActions.confirmLogin()) : dispatch(authActions.logout());
  }, [dispatch, isLogged]);

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
        dispatch(authActions.logout());
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
