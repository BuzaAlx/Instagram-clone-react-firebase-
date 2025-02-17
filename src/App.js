import "./App.css";
import React, { useEffect } from "react";
import { BrowsePage, SignIn, SignUp, UserPage } from "./pages";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import * as ROUTES from "./constants/routes";

import { ProtectedRoute, IsUserRedirect } from "./utils/routes";
import { useSelector, useDispatch } from "react-redux";
import { CheckUserSessionStart } from "./redux/User/user.reducer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CheckUserSessionStart());
  }, []);

  const NotFound = () => {
    return <h1>page not found</h1>;
  };

  return (
    <Router>
      <div>
        <Switch>
          <IsUserRedirect
            loggedInPath={ROUTES.BROWSE}
            path={ROUTES.SIGN_IN}
            exact
          >
            <SignIn />
          </IsUserRedirect>

          <IsUserRedirect
            loggedInPath={ROUTES.BROWSE}
            path={ROUTES.SIGN_UP}
            exact
          >
            <SignUp />
          </IsUserRedirect>

          <ProtectedRoute path={ROUTES.BROWSE} exact>
            <BrowsePage />
          </ProtectedRoute>

          <Route path={ROUTES.USER} exact>
            <UserPage />
          </Route>

          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
