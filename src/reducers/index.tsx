import { combineReducers } from "redux";
import tab from "./tab";
import state from "./state";
import alert from "./alert";
import photoList from "./photoList"
import uploadProgress from "./uploadProgress"

export default combineReducers({
  tab,
  state,
  alert,
  photoList,
  uploadProgress
})
