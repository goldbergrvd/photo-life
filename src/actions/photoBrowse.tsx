import { TOGGLE_PHOTO_BROWSE_INFO } from "../constants"

export interface TogglePhotoBrowseInfo {
  type: TOGGLE_PHOTO_BROWSE_INFO;
}

export type PhotoBrowseAction = TogglePhotoBrowseInfo

export function togglePhotoBrowseInfo(): PhotoBrowseAction {
  return {
    type: TOGGLE_PHOTO_BROWSE_INFO
  }
}
