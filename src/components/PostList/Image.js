import React, { useEffect, useState } from "react";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { Box, Modal, Typography, Badge } from "@material-ui/core";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { db } from "../../Firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "auto",
    height: "auto",
  },
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,

    height: "40vw",
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
  },
  icon: {
    color: "#f06292",
  },
  ImgModal: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  modalIcon: {
    position: "absolute",
    top: "10px",
    right: "10px",
    [theme.breakpoints.up("sm")]: {
      visibility: "hidden",
    },
  },
  ListBar: {
    background: "none",
    [theme.breakpoints.down("sm")]: {
      visibility: "hidden",
    },
  },
  photo: {
    width: "32%",

    height: "30vw",
    [theme.breakpoints.up("md")]: {
      height: "300px",
    },
  },
}));

function Image({ post, postId }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [likes, setLikes] = useState(null);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("likes")
        .onSnapshot((snapshot) => {
          setLikes(snapshot.docs.length);
        });
    }
    return () => unsubscribe();
  }, [post]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const modalBody = (
    <div className={classes.paper}>
      <img
        src={post?.imageUrl}
        className={classes.ImgModal}
        alt="somePostTitle"
      />
      <Box className={classes.modalIcon}>
        <Badge badgeContent={likes} color="secondary">
          <FavoriteIcon className={classes.icon} />
        </Badge>
      </Box>
    </div>
  );

  return (
    <>
      <GridListTile className={classes.photo} onClick={handleOpen}>
        <img src={post?.imageUrl} alt="postImage" />

        <GridListTileBar
          className={classes.ListBar}
          subtitle={moment(post?.timestamp?.toDate()).fromNow()}
          title={post.caption}
          actionIcon={
            <Box
              display="flex"
              pr={2}
              alignItems="center"
              flexDirection="column"
              color="white"
            >
              <FavoriteIcon className={classes.icon} />
              <Typography>{likes} likes </Typography>
            </Box>
          }
        />
      </GridListTile>
      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalBody}
      </Modal>
    </>
  );
}

Image.propTypes = {
  post: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
};

export default Image;
