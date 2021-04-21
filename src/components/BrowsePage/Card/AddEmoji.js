import React, { useState } from "react";
import { IconButton, Popover } from "@material-ui/core";
import SentimentSatisfiedRoundedIcon from "@material-ui/icons/SentimentSatisfiedRounded";
import { makeStyles } from "@material-ui/core/styles";
import emojis from "../../../utils/emojis";
import PropTypes from "prop-types";
import usePopover from "../../../hooks/usePopover";

const useStyles = makeStyles((theme) => ({
  smileButton: {
    position: "absolute",
    right: 0,
  },
  emojiContainer: {
    fontSize: "20px",
    display: "flex",
  },
  emoji: {
    display: "block",
    padding: 10,
    cursor: "pointer",
  },
}));

function AddEmoji({ setComment }) {
  const styles = useStyles();
  let [
    anchorEl,
    handleClick,
    handleClose,
    open,
    id,
    setAnchorEl,
  ] = usePopover();

  const handlePickEmoji = (em) => {
    setComment((comment) => (comment += em));
    setAnchorEl(null);
  };

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
        <div className={styles.emojiContainer}>
          {emojis.map((em) => {
            return (
              <span
                key={em.id}
                className={styles.emoji}
                onClick={() => handlePickEmoji(em.content)}
              >
                {em.content}
              </span>
            );
          })}
        </div>
      </Popover>
    </>
  );
}

AddEmoji.propTypes = {
  setComment: PropTypes.func.isRequired,
};

export default AddEmoji;
