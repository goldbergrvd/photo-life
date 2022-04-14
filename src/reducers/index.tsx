import { combineReducers } from "redux";
import tab from "./tab";
import state from "./state";
import photoList from "./photoList"
import uploadProgress from "./uploadProgress"

export default combineReducers({
  tab,
  state,
  photoList,
  uploadProgress
})
