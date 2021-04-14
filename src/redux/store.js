import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from "redux-persist";

const middlewares = [thunk, logger];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

const persistor = persistStore(store);

export { store, persistor };
