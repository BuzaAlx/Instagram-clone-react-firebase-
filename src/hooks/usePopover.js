import React, { useState } from "react";
import { useSelector } from "react-redux";

function usePopover(userId) {
  let { currentUser } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    if (userId && userId !== currentUser.displayName) return;
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return [anchorEl, handleClick, handleClose, open, id, setAnchorEl];
}

export default usePopover;
