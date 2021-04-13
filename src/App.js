import "./App.css";
import React, { useEffect } from "react";
import { Browse, SignIn, SignUp, UserPage } from "./pages";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import useAuthListener from "./hooks/use-auth-listener";

import { ProtectedRoute, IsUserRedirect } from "./utils/routes";
import { useSelector, useDispatch } from "react-redux";
import { CheckUserSessionStart } from "./redux/User/user.reducer";

function App() {
  // const { user } = useAuthListener();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CheckUserSessionStart());
  }, []);

  const { currentUser } = useSelector((state) => state.user);
  console.log("CURRRENT USER IS", { currentUser });
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
            <Browse />
          </ProtectedRoute>

          <Route path={ROUTES.USER} exact>
            <UserPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
