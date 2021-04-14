import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import { Button, Popover } from "@material-ui/core";
import PropTypes from "prop-types";

function AddPost({ user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Add post
      </Button>

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
        <ImageUpload close={handleClose} username={user && user.displayName} />
      </Popover>
    </>
  );
}

AddPost.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AddPost;
