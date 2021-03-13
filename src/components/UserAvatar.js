import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Popover,
  Grid,
  Box,
  Button,
  Typography,
} from "@material-ui/core";
import { storage, db, auth } from "../Firebase";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

function UserAvatar({ userId, user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [avatar, setAvatar] = useState("");
  const classes = useStyles();

  const handleClick = (event) => {
    if (userId !== user.displayName) return;
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`users/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("users")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            auth.currentUser
              .updateProfile({
                photoURL: url,
              })
              .then(function () {
                console.log("user Avatar changed");
              })
              .catch(function (error) {
                console.log(error);
              });

            db.collection("users")
              .doc("images")
              .set(
                {
                  [userId]: url,
                },
                { merge: true }
              );

            setImage(null);
          });
      }
    );
  };

  useEffect(() => {
    db.collection("users")
      .doc("images")
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setAvatar(doc.data()[userId]);
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, [userId]);

  return (
    <div>
      <Avatar
        className={classes.large}
        aria-describedby={id}
        onClick={handleClick}
        src={user.displayName === userId ? user.photoURL : avatar}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Grid
          container
          direction="column"
          style={{ maxWidth: "400px", padding: "10px" }}
        >
          <Box width={200}>
            <Typography color="textSecondary">Upload image</Typography>
            <Box justifyContent="space-between" display="flex" mt={2}>
              <Button size="small" variant="contained" component="label">
                Upload File
                <input onChange={handleChange} type="file" hidden />
              </Button>

              <Button
                size="small"
                disabled={!image}
                variant="contained"
                className="imageupload__button"
                onClick={handleUpload}
              >
                Upload
              </Button>
            </Box>
          </Box>

          <br />
        </Grid>
      </Popover>
    </div>
  );
}

export default UserAvatar;
