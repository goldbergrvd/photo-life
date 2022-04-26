import { UploadProgressAction } from "../actions";
import { SET_UPLOAD_PROGRESS } from "../constants";

export default function uploadProgressReducer (uploadProgress: number = 0, action: UploadProgressAction): number {
  switch(action.type) {
    case SET_UPLOAD_PROGRESS:
      return action.payload.uploadProgress
    default:
      return uploadProgress
  }
}
