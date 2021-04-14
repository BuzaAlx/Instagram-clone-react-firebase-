import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CssBaseline,
  Typography,
  TextField,
  Link,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { auth } from "../Firebase";
import * as ROUTES from "../constants/routes";

import { useDispatch, useSelector } from "react-redux";
import { SignInStart } from "../redux/User/user.reducer";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const classes = useStyles();
  const history = useHistory();

  const handleSignin = (e) => {
    e.preventDefault();
    let isInvalid = password === "" || emailAddress === "";
    if (isInvalid) return null;

    dispatch(SignInStart({ emailAddress, password }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {error !== "" && <h3>{error}</h3>}
        <form className={classes.form} noValidate onSubmit={handleSignin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={emailAddress}
            onChange={({ target }) => setEmailAddress(target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/SignUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignIn;
