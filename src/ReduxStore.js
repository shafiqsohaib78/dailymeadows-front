import { createStore, applyMiddleware } from "redux";
import Reducer from "../src/Reducers/CounterReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const initialState = {};
const middleware = [thunk];
const store = createStore(
  Reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
