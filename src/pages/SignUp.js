import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as ROUTES from "../constants/routes";
import { auth } from "../Firebase";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignUpUserStart } from "../redux/User/user.reducer";

const newUserImg =
  "https://www.nj.com/resizer/h8MrN0-Nw5dB5FOmMVGMmfVKFJo=/450x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSignup = (e) => {
    e.preventDefault();

    dispatch(
      SignUpUserStart({ displayName: firstName, email: emailAddress, password })
    );

    // let isInvalid = password === "" || emailAddress === "";
    // if (isInvalid) return null;

    // return auth
    //   .createUserWithEmailAndPassword(emailAddress, password)
    //   .then(({ user }) =>
    //     // console.log(user) getSnapshotFromUserAuth will be here !!!!!!!!!!!!!!
    //     user
    //       .updateProfile({
    //         displayName: firstName,
    //         photoURL: newUserImg,
    //       })
    //       .then(() => {
    //         history.push(ROUTES.BROWSE);
    //       })
    //   )
    //   .catch((error) => {
    //     setFirstName("");
    //     setEmailAddress("");
    //     setPassword("");
    //     setError(error.message);
    //   });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {error !== "" && <Typography color="error">{error}</Typography>}
        <form className={classes.form} noValidate onSubmit={handleSignup}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signIn" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5} textAlign="center">
        Some copyright text
      </Box>
    </Container>
  );
}

export default SignUp;
