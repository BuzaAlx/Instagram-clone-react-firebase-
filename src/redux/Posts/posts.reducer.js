import { postsTypes } from "./posts.types";
import { addPost, getPosts } from "./post.helpers";
import { setPostsActionCreator, addPostActionCreator } from "./posts.actions";
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
