import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export function IsUserRedirect({ loggedInPath, children, ...rest }) {
  const { currentUser: user } = useSelector((state) => state.user);

  return (
    <Route
      {...rest}
      render={() => {
        if (!user) {
          return children;
        }

        if (user) {
          return (
            <Redirect
              to={{
                pathname: loggedInPath,
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}

export function ProtectedRoute({ children, ...rest }) {
  const { currentUser: user } = useSelector((state) => state.user);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          return children;
        }

        if (!user) {
          return (
            <Redirect
              to={{
                pathname: "signin",
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}
