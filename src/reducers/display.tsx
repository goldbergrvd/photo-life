import { DisplayAction } from "../actions";
import { CLOSE_VIDEO_CONTROLS, OPEN_PHOTO_BROWSE_INFO, OPEN_VIDEO_CONTROLS, TOGGLE_PHOTO_BROWSE_INFO } from "../constants";
import { Display } from "../types";

export default function display (display: Display = { photoBrowseInfo: true, videoControls: true }, action: DisplayAction): Display {
  const newDisplay = {...display}

  switch(action.type) {
    case TOGGLE_PHOTO_BROWSE_INFO:
      newDisplay.photoBrowseInfo = !newDisplay.photoBrowseInfo
      return newDisplay

    case OPEN_PHOTO_BROWSE_INFO:
      newDisplay.photoBrowseInfo = true
      return newDisplay

    case OPEN_VIDEO_CONTROLS:
      newDisplay.videoControls = true
      return newDisplay

    case CLOSE_VIDEO_CONTROLS:
      newDisplay.videoControls = false
      return newDisplay

    default:
      return display
  }
}