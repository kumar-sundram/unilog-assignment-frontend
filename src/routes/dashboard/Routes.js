import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import routes from "../../routes";

const Dashboard = lazy(() => import("./Index"));

const Routes = ({ match: { path } }) => {
  return (
    <Suspense>
      <Switch>
        <Route path={`${routes.dashboard}/posts`} component={Dashboard} exact />
        <Route
          path={path}
          render={({ history }) => <Redirect to={`${routes.dashboard}/posts`}/>}
        />
      </Switch>
    </Suspense>
  );
};

export default Routes;