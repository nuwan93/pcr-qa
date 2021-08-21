import { combineReducers } from "redux";
import reportReducer from "./reportReducer";

const reducers = combineReducers({
  report: reportReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
