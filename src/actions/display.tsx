import { CLOSE_VIDEO_CONTROLS, OPEN_PHOTO_BROWSE_INFO, OPEN_VIDEO_CONTROLS, TOGGLE_PHOTO_BROWSE_INFO } from "../constants"

export interface TogglePhotoBrowseInfo {
  type: TOGGLE_PHOTO_BROWSE_INFO;
}

export interface OpenPhotoBrowseInfo {
  type: OPEN_PHOTO_BROWSE_INFO;
}

export interface OpenVideoControls {
  type: OPEN_VIDEO_CONTROLS;
}

export interface CloseVideoControls {
  type: CLOSE_VIDEO_CONTROLS;
}

export type DisplayAction = TogglePhotoBrowseInfo | OpenPhotoBrowseInfo | OpenVideoControls | CloseVideoControls

export function togglePhotoBrowseInfo(): DisplayAction {
  return {
    type: TOGGLE_PHOTO_BROWSE_INFO
  }
}

export function openPhotoBrowseInfo(): DisplayAction {
  return {
    type: OPEN_PHOTO_BROWSE_INFO
  }
}

export function openVideoControls(): DisplayAction {
  return {
    type: OPEN_VIDEO_CONTROLS
  }
}

export function closeVideoControls(): DisplayAction {
  return {
    type: CLOSE_VIDEO_CONTROLS
  }
}

