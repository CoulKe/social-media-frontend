import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalStyles } from "./styles/Global";
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

//Wrapper
const AppRouter = ({
  component: Component,
  layout: Layout,
  requireAuth,
  isLogged,
  ...rest
}) => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Route
      {...rest}
      render={(props) => {
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
  let isLogged = localStorage.getItem("loggedUser") ? true : false;

  return (
    <Router>
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
