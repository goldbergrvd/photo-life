import { SET_UPLOAD_PROGRESS } from "../constants"

export interface SetUploadProgress {
  type: SET_UPLOAD_PROGRESS;
  payload: {
    uploadProgress: number
  }
}

export type UploadProgressAction = SetUploadProgress

export function setUploadProgress(uploadProgress: number): UploadProgressAction {
  return {
    type: SET_UPLOAD_PROGRESS,
    payload: { uploadProgress }
  }
}
