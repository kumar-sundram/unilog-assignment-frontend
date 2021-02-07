import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loader from "../component/Loader";
import routes from "../routes";

const DashboardRoutes = lazy(() => import("./dashboard/Routes"))

const Routes = ({ history,path }) => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path={routes.home} render={() => <Redirect to={`${routes.dashboard}`} />} />
        <Route path={`${routes.dashboard}`} component={DashboardRoutes} />
        <Route path={path} render={() => <Redirect to={`${routes.dashboard}`} />} />
      </Switch>
    </Suspense>
  )
};

export default Routes;