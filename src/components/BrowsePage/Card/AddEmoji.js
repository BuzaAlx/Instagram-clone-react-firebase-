import React, { useState } from "react";
import { IconButton, Popover } from "@material-ui/core";
import SentimentSatisfiedRoundedIcon from "@material-ui/icons/SentimentSatisfiedRounded";
import emojis from "../../../utils/emojis";
import PropTypes from "prop-types";
import usePopover from "../../../hooks/usePopover";
import { useStyles } from "../../styles/AddEmojiStyles";

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
