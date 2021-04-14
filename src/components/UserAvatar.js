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
import PropTypes from "prop-types";

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
    let pictureRef = storage.refFromURL(user.photoURL);
    pictureRef
      .delete()
      .then(() => {
        console.log("picture is delete");
      })
      .catch((err) => {
        console.log(err);
      });

    // first delete previous photo from storage
    const uploadTask = storage.ref(`MYusers/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("MYusers")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            db.collection("myusers").doc(user.id).set(
              {
                photoURL: url,
              },
              { merge: true }
            );

            setImage(null);
            handleClose();
          });
      }
    );
  };

  useEffect(() => {
    db.collection("myusers")
      .where("displayName", "==", userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setAvatar(doc.data().photoURL);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
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

UserAvatar.propTypes = {
  userId: PropTypes.string,
  user: PropTypes.object,
};

export default UserAvatar;
