import React, { useState } from "react";
import firebase from "firebase";
import { storage, db } from "../../Firebase";
import { Input, Button, Grid, Box, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { uploadNewPostThunk } from "../../redux/User/user.reducer";

const ImageUpload = ({ username, close }) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  const { postUploadProgress } = useSelector((state) => state.user);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    dispatch(uploadNewPostThunk(image, caption, username, close));
    setCaption("");
    setImage(null);
  };

  return (
    <Grid
      container
      direction="column"
      style={{ maxWidth: "400px", padding: "10px" }}
    >
      <Box mb={1}>
        <Typography color="textSecondary">Loading status</Typography>
        <progress
          style={{ width: "100%" }}
          value={postUploadProgress}
          max="100"
        />
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
