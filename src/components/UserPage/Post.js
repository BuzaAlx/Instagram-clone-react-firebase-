import React, { useEffect, useState } from "react";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { Box, Modal, Typography, Badge } from "@material-ui/core";
import PropTypes from "prop-types";
import moment from "moment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { db } from "../../Firebase";
import { useStyles } from "../styles/PostStyles";

function Post({ post, postId }) {
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

  const ModalBody = () => {
    return (
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
  };

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
              {likes && (
                <>
                  <FavoriteIcon className={classes.icon} />
                  <Typography>{likes} like </Typography>
                </>
              )}
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
        <ModalBody />
      </Modal>
    </>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
};

export default Post;
