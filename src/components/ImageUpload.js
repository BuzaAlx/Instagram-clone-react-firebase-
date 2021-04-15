import React, { useState } from "react";
import firebase from "firebase";
import { storage, db } from "../Firebase";
import { Input, Button, Grid, Box, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { addNewPostThunk } from "../redux/User/user.reducer";

const ImageUpload = ({ username, close }) => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  //TODO: Make a custom hook
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        // complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // setUrl(url);

            // post image inside db

            dispatch(
              addNewPostThunk(
                {
                  imageUrl: url,
                  caption: caption,
                  username: username,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                },
                username
              )
            );

            setProgress(0);
            setCaption("");
            setImage(null);
            close();
          });
      }
    );
  };

  return (
    <Grid
      container
      direction="column"
      style={{ maxWidth: "400px", padding: "10px" }}
    >
      <Box mb={1}>
        <Typography color="textSecondary">Loading status</Typography>
        <progress style={{ width: "100%" }} value={progress} max="100" />
      </Box>
      <Input
        placeholder="Enter a caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

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

      <br />
    </Grid>
  );
};

ImageUpload.propTypes = {
  username: PropTypes.string.isRequired,
  userImg: PropTypes.string.isRequired,
};

export default ImageUpload;
