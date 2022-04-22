import { ADD_VIDEOS, CLEAR_VIDEO_SELECT, CLOSE_VIDEO_FULLSCREEN, DELETE_VIDEOS, OPEN_VIDEO_FULLSCREEN, PAUSE_VIDEO, PLAY_VIDEO, SET_VIDEO_TIME, TOGGLE_VIDEO_SELECT, UPDATE_VIDEOS } from "../constants";
import { VideoList } from "../types";

export interface AddVideos {
  type: ADD_VIDEOS;
  payload: VideoList;
}

export interface UpdateVideos {
  type: UPDATE_VIDEOS;
  payload: VideoList;
}

export interface DeleteVideos {
  type: DELETE_VIDEOS;
  payload: Map<string, boolean>;
}

export interface PlayVideo {
  type: PLAY_VIDEO;
  payload: number;
}

export interface PauseVideo {
  type: PAUSE_VIDEO;
  payload: number;
}

export interface OpenVideoFullscreen {
  type: OPEN_VIDEO_FULLSCREEN;
  payload: number;
}

export interface CloseVideoFullscreen {
  type: CLOSE_VIDEO_FULLSCREEN;
  payload: number;
}

export interface SetVideoTime {
  type: SET_VIDEO_TIME;
  payload: {
    index: number,
    currentTime: number,
    duration: number
  }
}

export interface ToggleVideoSelect {
  type: TOGGLE_VIDEO_SELECT;
  payload: number;
}

export interface ClearVideoSelect {
  type: CLEAR_VIDEO_SELECT;
}

export type VideoAction = AddVideos | UpdateVideos | DeleteVideos | PlayVideo | PauseVideo | OpenVideoFullscreen | CloseVideoFullscreen | SetVideoTime | ToggleVideoSelect | ClearVideoSelect;

export function addVideos (names: string[]): AddVideos {
  return {
    type: ADD_VIDEOS,
    payload: names.map(name => ({
      name,
      play: false,
      fullscreen: false,
      selected: false,
      currentTime: 0,
      duration: 0
    }))
  }
}

export function updateVideos (names: string[]): UpdateVideos {
  return {
    type: UPDATE_VIDEOS,
    payload: names.map(name => ({
      name,
      play: false,
      fullscreen: false,
      selected: false,
      currentTime: 0,
      duration: 0
    }))
  }
}

export function deleteVideos(deleteMap: Map<string, boolean>): DeleteVideos {
  return {
    type: DELETE_VIDEOS,
    payload: deleteMap
  }
}

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

export function toggleVideoSelect (index: number): ToggleVideoSelect {
  return {
    type: TOGGLE_VIDEO_SELECT,
    payload: index
  }
}

export function clearVideoSelect (): ClearVideoSelect {
  return {
    type: CLEAR_VIDEO_SELECT
  }
}
