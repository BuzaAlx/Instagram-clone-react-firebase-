import React, { useState } from "react";
import firebase from "firebase";
import { storage, db } from "../Firebase";
import { Input, Button, Grid, Box, Typography } from "@material-ui/core";

const ImageUpload = ({ username, userImg }) => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);

            // post image inside db
            db.collection("posts").add({
              imageUrl: url,
              caption: caption,
              username: username,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

            setProgress(0);
            setCaption("");
            setImage(null);
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

export default ImageUpload;
