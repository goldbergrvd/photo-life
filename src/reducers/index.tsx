import { combineReducers } from "redux";
import tab from "./tab";
import state from "./state";
import viewType from "./viewType";
import alert from "./alert";
import photoList from "./photoList"
import uploadProgress from "./uploadProgress"
import videoList from "./videoList";
import messages from "./messages";
import display from "./display";

export default combineReducers({
  tab,
  state,
  viewType,
  alert,
  photoList,
  videoList,
  uploadProgress,
  display,
  messages
})
