import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route, useRouteMatch } from "react-router-dom";
import Loader from "../../component/Loader";
import routes from "../../routes";

const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));
const Logout = lazy(() => import("./Logout"));

const Routes = () => {
  const { path } = useRouteMatch();
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path={routes.authRegister} component={Register} exact />
        <Route path={routes.authLogin} component={Login} exact />
        <Route path={routes.authLogout} component={Logout} exact />
        <Route
          path={path}
          render={({ history }) => <Redirect to={routes.authLogin} />}
          exact
        />
      </Switch>
    </Suspense>
  );
};

export default Routes;