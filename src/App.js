import React, { Suspense, lazy } from 'react';
import './App.scss'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { isEmpty } from "./utils/Utils"
import routes from './routes';
import Loader from "./component/Loader"

const AuthRoutes = lazy(() => import("./routes/auth/Routes"))
const Navigation = lazy(() => import("./component/Nav"))

const App = () => {
  const authToken = window.localStorage.getItem("AUTH_TOKEN")
 
  return (
    <div className="page-container">
      <BrowserRouter forceRefresh={true}>
        <Suspense fallback={<Loader />}>
          <Switch>
            {!isEmpty(authToken) && <Route path="/" component={Navigation} />}
            <Route path={routes.auth} component={AuthRoutes} />
            {isEmpty(authToken) && <Redirect to={routes.auth} />}
          </Switch>
        </Suspense>
      </BrowserRouter >
    </div>
  );
}

export default App;
