import { postsTypes } from "./posts.types";
import { getPosts, getComments } from "./post.helpers";
import {
  setPostsActionCreator,
  addCommentsActionCreator,
} from "./posts.actions";
import { db } from "../../Firebase";

const INITIAL_STATE = {
  posts: [],
};

const postsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case postsTypes.SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case postsTypes.ADD_COMMENTS:
      let postId = action.payload.postId;
      let postsCopy = [...state.posts];

      let postIndex = postsCopy.findIndex((p) => p.id === postId);

      let postCopy = {
        ...postsCopy[postIndex],
        comments: action.payload.comments,
      };

      // debugger;

      return {
        ...state,
        posts: postsCopy,
      };

    default:
      return state;
  }
};

export default postsReducer;

export const getPostsThunk = () => async (dispatch) => {
  try {
    const post = await getPosts();
    dispatch(setPostsActionCreator(post));
  } catch (error) {
    console.log(error);
  }
};

export const getPostCommentsThunk = (postId) => async (dispatch) => {
  try {
    let comments = await getComments(postId);
    dispatch(addCommentsActionCreator({ comments, postId }));
  } catch (error) {
    console.log(error);
  }
};
