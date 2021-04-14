import { combineReducers } from "redux";
import userReducer from "./User/user.reducer";
import postsReducer from "./Posts/posts.reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ user: userReducer, posts: postsReducer });

const configStorage = {
  key: "root",
  storage,
  whitelist: ["posts"],
};

export default persistReducer(configStorage, rootReducer);
