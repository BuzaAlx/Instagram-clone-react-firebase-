import { postsTypes } from "./posts.types";
import {
  getPosts,
  getComments,
  postComment,
  getLikes,
  addLike,
  getUserImage,
  deleteImgFromStorage,
  deletePost,
} from "./post.helpers";
import {
  setPostsActionCreator,
  setCommentActionCreator,
  deleteCommentActionCreator,
  deleteLikeActionCreator,
  addLikeActionCreator,
  setPostAvatarActionCreator,
  postDelectedActionCreator,
} from "./posts.actions";
import { db } from "../../Firebase";

const INITIAL_STATE = {
  posts: [],
  isLoading: false,
};

const postsReducer = (state = INITIAL_STATE, action) => {
  let postId, postsCopy, postIndex, postCopy, commentsCopy;
  switch (action.type) {
    case postsTypes.SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case postsTypes.ADD_COMMENTS:
      postId = action.payload.postId;
      postsCopy = [...state.posts];
      postIndex = postsCopy.findIndex((p) => p.id === postId);

      postCopy = {
        ...postsCopy[postIndex],
        comments: action.payload.comments,
      };

      postsCopy[postIndex] = postCopy;

      return {
        ...state,
        posts: postsCopy,
      };
    case postsTypes.SET_COMMENT:
      let { newCommentTemplate } = action.payload;

      postsCopy = [...state.posts];
      postIndex = postsCopy.findIndex((p) => p.id === action.payload.postId);
      commentsCopy = postsCopy[postIndex].comments;

      postCopy = {
        ...postsCopy[postIndex],
        comments: [...commentsCopy, newCommentTemplate],
      };

      postsCopy[postIndex] = postCopy;

      return {
        ...state,
        posts: postsCopy,
      };

    case postsTypes.DELETE_COMMENT:
      let { postId, id } = action.payload;

      postsCopy = [...state.posts];
      postIndex = postsCopy.findIndex((p) => p.id === action.payload.postId);
      commentsCopy = postsCopy[postIndex].comments;

      let comment = commentsCopy.find((c) => c.id === id);
      let newComments = commentsCopy.filter((c) => c.id !== comment.id);

      postsCopy[postIndex] = { ...postsCopy[postIndex], comments: newComments };

      return {
        ...state,
        posts: postsCopy,
      };

    case postsTypes.DELECTE_LIKE: {
      let { postId, likeId } = action.payload;

      postsCopy = [...state.posts];
      postIndex = postsCopy.findIndex((p) => p.id === postId);
      let likesCopy = postsCopy[postIndex].likes;

      let like = likesCopy.find((l) => l.id === likeId);
      let newLikes = likesCopy.filter((l) => l.id !== like.id);

      postsCopy[postIndex] = { ...postsCopy[postIndex], likes: newLikes };
      return {
        ...state,
        posts: postsCopy,
      };
    }
    case postsTypes.ADD_LIKE: {
      let { postId, obj } = action.payload;

      postsCopy = [...state.posts];
      postIndex = postsCopy.findIndex((p) => p.id === postId);
      let likesCopy = postsCopy[postIndex].likes;

      postsCopy[postIndex] = {
        ...postsCopy[postIndex],
        likes: [...likesCopy, obj],
      };

      return {
        ...state,
        posts: postsCopy,
      };
    }
    case postsTypes.SET_POST_AVATAR: {
      let { img, postId } = action.payload;

      postsCopy = [...state.posts];
      postIndex = postsCopy.findIndex((p) => p.id === postId);

      postsCopy[postIndex] = {
        ...postsCopy[postIndex],
        postCreatorAvatar: img,
      };

      return {
        ...state,
        posts: postsCopy,
      };
    }
    case postsTypes.POST_WAS_DELETED: {
      let id = action.payload;

      postsCopy = [...state.posts];
      let newPosts = postsCopy.filter((p) => p.id !== id);

      return {
        ...state,
        posts: newPosts,
      };
    }
    case postsTypes.RESET_DATA:
      return {
        state: INITIAL_STATE,
      };
    case postsTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default postsReducer;

export const getPostsThunk = () => async (dispatch) => {
  try {
    const posts = await getPosts();

    let postsWithComments = posts.map(async (post) => {
      let comments = await getComments(post.id);
      let likes = await getLikes(post.id);
      return { ...post, comments, likes };
    });

    Promise.all(postsWithComments).then((posts) => {
      dispatch(setPostsActionCreator(posts));
    });
  } catch (error) {
    console.log(error);
  }
};

export const postCommentThunk = (data) => async (dispatch) => {
  try {
    let id = await postComment(data); //bad TODO: formate this, problem: cant receive data from the FB after adding
    let newCommentTemplate = {
      id,
      comment: {
        text: data.text,
        username: data.username,
        timestamp: {
          nanoseconds: 0,
          seconds: 0,
        },
      },
    };
    dispatch(
      setCommentActionCreator({ newCommentTemplate, postId: data.postId })
    );
  } catch (error) {
    console.log(error);
  }
};

export const deleteCommentThunk = (postId, id) => async (dispatch) => {
  try {
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (e) {
        console.error("Error removing document: ", e);
      });
    dispatch(deleteCommentActionCreator({ postId, id }));
  } catch (error) {
    console.log(error);
  }
};

export const deleteLikeThunk = (postId, found) => async (dispatch) => {
  try {
    db.collection("posts")
      .doc(postId)
      .collection("likes")
      .doc(found.id)
      .delete();

    dispatch(deleteLikeActionCreator({ postId, likeId: found.id }));
  } catch (error) {
    console.log(error);
  }
};

export const addLikeThunk = (postId, username) => async (dispatch) => {
  try {
    let id = await addLike({ postId, username });
    let obj = {
      username,
      id,
    };

    dispatch(addLikeActionCreator({ postId, obj }));
  } catch (error) {
    console.log(error);
  }
};

export const getPostAvatarThunk = (username, postId) => async (dispatch) => {
  try {
    let img = await getUserImage(username);
    dispatch(setPostAvatarActionCreator({ img, postId }));
  } catch (error) {
    console.log(error);
  }
};

export const deletePostThunk = (post) => async (dispatch) => {
  try {
    let deleteImagePomise = await deleteImgFromStorage(post.imageUrl);
    let deletePostPromise = await deletePost(post.id);

    Promise.all([deleteImagePomise, deletePostPromise]).then(() =>
      dispatch(postDelectedActionCreator(post.id))
    );
  } catch (error) {
    console.log(error);
  }
};
