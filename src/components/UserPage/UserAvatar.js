import React, { useState, useEffect } from "react";
import {
  Avatar,
  Popover,
  Grid,
  Box,
  Button,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import usePopover from "../../hooks/usePopover";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAvatarThunk,
  uploadNewAvatarThunk,
} from "../../redux/User/user.reducer";
import { useStyles } from "../styles/UserAvatarStyle";

function UserAvatar({ userId, user }) {
  let [anchorEl, handleClick, handleClose, open, id] = usePopover(userId);
  const [image, setImage] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedUserImage } = useSelector(
    (state) => state.user.selectedUserData
  );

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    dispatch(uploadNewAvatarThunk(image, user, handleClose));
    setImage(null);
  };

  useEffect(() => {
    dispatch(getUserAvatarThunk(userId));
  }, [userId]);

  return (
    <div>
      <Avatar
        className={classes.large}
        aria-describedby={id}
        onClick={handleClick}
        src={selectedUserImage}
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
