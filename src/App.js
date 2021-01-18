import "./App.css";
import React from "react";
import { Browse, SignIn, SignUp, UserPage } from "./pages";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import useAuthListener from "./hooks/use-auth-listener";

import { ProtectedRoute, IsUserRedirect } from "./utils/routes";

function App() {
  const { user } = useAuthListener();

  return (
    <Router>
      <div>
        <Switch>
          <IsUserRedirect
            loggedInPath={ROUTES.BROWSE}
            path={ROUTES.SIGN_IN}
            user={user}
            exact
          >
            <SignIn />
          </IsUserRedirect>

          <IsUserRedirect
            loggedInPath={ROUTES.BROWSE}
            user={user}
            path={ROUTES.SIGN_UP}
            exact
          >
            <SignUp />
          </IsUserRedirect>

          <ProtectedRoute path={ROUTES.BROWSE} exact user={user}>
            <Browse user={user} />
          </ProtectedRoute>

          <Route path={ROUTES.USER} exact>
            <UserPage user={user} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
