import { PhotoBrowseAction } from "../actions";
import { TOGGLE_PHOTO_BROWSE_INFO } from "../constants";

export default function photoBrowse (showPhotoBrowseInfo: boolean = true, action: PhotoBrowseAction): boolean {
  switch(action.type) {
    case TOGGLE_PHOTO_BROWSE_INFO:
      return !showPhotoBrowseInfo
    default:
      return showPhotoBrowseInfo
  }
}