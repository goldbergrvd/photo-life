import { combineReducers } from "redux";
import tab from "./tab";
import state from "./state";
import alert from "./alert";
import photoList from "./photoList"
import uploadProgress from "./uploadProgress"
import videoList from "./videoList";
import fileCountColor from "./fileCountColor";
import messages from "./messages";

export default combineReducers({
  tab,
  state,
  alert,
  photoList,
  videoList,
  uploadProgress,
  fileCountColor,
  messages
})
