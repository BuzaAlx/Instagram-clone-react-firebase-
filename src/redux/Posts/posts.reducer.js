import { postsTypes } from "./posts.types";
import { getPosts } from "./post.helpers";
import { setPostsActionCreator } from "./posts.actions";

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
