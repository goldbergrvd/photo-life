import { combineReducers } from "redux";
import tab from "./tab";
import state from "./state";
import viewType from "./viewType";
import alert from "./alert";
import photoList from "./photoList"
import videoList from "./videoList";
import albumList from "./albumList";
import uploadProgress from "./uploadProgress"
import messages from "./messages";
import display from "./display";

export default combineReducers({
  tab,
  state,
  viewType,
  alert,
  photoList,
  videoList,
  albumList,
  uploadProgress,
  display,
  messages
})
