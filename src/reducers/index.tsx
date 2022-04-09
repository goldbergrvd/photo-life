import { combineReducers } from "redux";
import state from './state';
import photoList from './photoList'

export default combineReducers({
  state,
  photoList
})
