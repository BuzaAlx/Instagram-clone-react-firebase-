import React, { useState } from "react";
import { IconButton, Popover } from "@material-ui/core";
import SentimentSatisfiedRoundedIcon from "@material-ui/icons/SentimentSatisfiedRounded";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  smileButton: {
    position: "absolute",
    right: 0,
  },
}));

function AddEmoji() {
  const styles = useStyles();
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
      <IconButton className={styles.smileButton} onClick={handleClick}>
        <SentimentSatisfiedRoundedIcon />
      </IconButton>

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
        <div style={{ fontSize: "20px", height: "35px" }}>
          <p>😄 😎 😍 😈</p>
        </div>
      </Popover>
    </>
  );
}

export default AddEmoji;
