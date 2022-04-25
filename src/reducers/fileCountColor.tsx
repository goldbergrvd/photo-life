import { FileCountColorAction } from "../actions/fileCountColor";
import { COLOR_BLACK, SET_FILE_COUNT_COLOR } from "../constants";

function fileCountColor(state: string = COLOR_BLACK, action: FileCountColorAction): string {
  switch(action.type) {
    case SET_FILE_COUNT_COLOR:
      return action.payload

    default:
      return state
  }
}

export default fileCountColor;
