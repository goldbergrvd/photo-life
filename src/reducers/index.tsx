import { combineReducers } from "redux";
import tab from "./tab";
import state from "./state";
import photoList from "./photoList"

export default combineReducers({
  tab,
  state,
  photoList
})
