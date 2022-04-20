import { CLOSE_VIDEO_FULLSCREEN, OPEN_VIDEO_FULLSCREEN, PAUSE_VIDEO, PLAY_VIDEO, SET_VIDEO_TIME } from "../constants";

export interface PlayVideo {
  type: PLAY_VIDEO,
  payload: number
}

export interface PauseVideo {
  type: PAUSE_VIDEO,
  payload: number
}

export interface OpenVideoFullscreen {
  type: OPEN_VIDEO_FULLSCREEN,
  payload: number
}

export interface CloseVideoFullscreen {
  type: CLOSE_VIDEO_FULLSCREEN,
  payload: number
}

export interface SetVideoTime {
  type: SET_VIDEO_TIME,
  payload: {
    index: number,
    currentTime: number,
    duration: number
  }
}

export type VideoAction = PlayVideo | PauseVideo | OpenVideoFullscreen | CloseVideoFullscreen | SetVideoTime;

export function playVideo (index: number): PlayVideo {
  return {
    type: PLAY_VIDEO,
    payload: index
  }
}

export function pauseVideo (index: number): PauseVideo {
  return {
    type: PAUSE_VIDEO,
    payload: index
  }
}

export function openVideoFullscreen (index: number): OpenVideoFullscreen {
  return {
    type: OPEN_VIDEO_FULLSCREEN,
    payload: index
  }
}

export function closeVideoFullscreen (index: number): CloseVideoFullscreen {
  return {
    type: CLOSE_VIDEO_FULLSCREEN,
    payload: index
  }
}

export function setVideoTime(index: number, currentTime: number, duration: number): SetVideoTime {
  return {
    type: SET_VIDEO_TIME,
    payload: {
      index,
      currentTime,
      duration
    }
  }
}