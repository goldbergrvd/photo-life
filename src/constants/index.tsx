export const IMAGE_EXT_LIST = ['.jpg', '.jpeg', '.png']
export const VIDEO_EXT_LIST = ['.mp4']

export const isImage = (filename: string) => (
  IMAGE_EXT_LIST.includes(filename.substring(filename.lastIndexOf('.')).toLowerCase())
);
export const isVideo = (filename: string) => (
  VIDEO_EXT_LIST.includes(filename.substring(filename.lastIndexOf('.')).toLowerCase())
);

export const SET_TAB = 'SET_TAB';
export type SET_TAB = typeof SET_TAB;

export const SET_STATE = 'SET_STATE';
export type SET_STATE = typeof SET_STATE;

export const SET_ALERT = 'SET_ALERT';
export type SET_ALERT = typeof SET_ALERT;

export const ADD_PHOTOS = 'ADD_PHOTOS';
export type ADD_PHOTOS = typeof ADD_PHOTOS;

export const UPDATE_PHOTOS = 'UPDATE_PHOTOS';
export type UPDATE_PHOTOS = typeof UPDATE_PHOTOS;

export const DELETE_PHOTOS = 'DELETE_PHOTOS';
export type DELETE_PHOTOS = typeof DELETE_PHOTOS;

export const OPEN_PHOTO_BROWSE = 'OPEN_PHOTO_BROWSE';
export type OPEN_PHOTO_BROWSE = typeof OPEN_PHOTO_BROWSE;

export const CLEAR_PHOTO_BROWSE = 'CLEAR_PHOTO_BROWSE';
export type CLEAR_PHOTO_BROWSE = typeof CLEAR_PHOTO_BROWSE;

export const PREV_PHOTO_BROWSE = 'PREV_PHOTO_BROWSE';
export type PREV_PHOTO_BROWSE = typeof PREV_PHOTO_BROWSE;

export const NEXT_PHOTO_BROWSE = 'NEXT_PHOTO_BROWSE';
export type NEXT_PHOTO_BROWSE = typeof NEXT_PHOTO_BROWSE;

export const TOGGLE_PHOTO_SELECT = 'TOGGLE_PHOTO_SELECT';
export type TOGGLE_PHOTO_SELECT = typeof TOGGLE_PHOTO_SELECT;

export const CLEAR_PHOTO_SELECT = 'CLEAR_PHOTO_SELECT';
export type CLEAR_PHOTO_SELECT = typeof CLEAR_PHOTO_SELECT;

export const SET_UPLOAD_PROGRESS = 'SET_UPLOAD_PROGRESS';
export type SET_UPLOAD_PROGRESS = typeof SET_UPLOAD_PROGRESS;

export const ADD_VIDEOS = 'ADD_VIDEOS';
export type ADD_VIDEOS = typeof ADD_VIDEOS;

export const UPDATE_VIDEOS = 'UPDATE_VIDEOS';
export type UPDATE_VIDEOS = typeof UPDATE_VIDEOS;

export const DELETE_VIDEOS = 'DELETE_VIDEOS';
export type DELETE_VIDEOS = typeof DELETE_VIDEOS;

export const PLAY_VIDEO = 'PLAY_VIDEO';
export type PLAY_VIDEO = typeof PLAY_VIDEO;

export const PAUSE_VIDEO = 'PAUSE_VIDEO';
export type PAUSE_VIDEO = typeof PAUSE_VIDEO;

export const OPEN_VIDEO_FULLSCREEN = 'OPEN_VIDEO_FULLSCREEN';
export type OPEN_VIDEO_FULLSCREEN = typeof OPEN_VIDEO_FULLSCREEN;

export const CLOSE_VIDEO_FULLSCREEN = 'CLOSE_VIDEO_FULLSCREEN';
export type CLOSE_VIDEO_FULLSCREEN = typeof CLOSE_VIDEO_FULLSCREEN;

export const SET_VIDEO_TIME = 'SET_VIDEO_TIME';
export type SET_VIDEO_TIME = typeof SET_VIDEO_TIME;

export const TOGGLE_VIDEO_SELECT = 'TOGGLE_VIDEO_SELECT';
export type TOGGLE_VIDEO_SELECT = typeof TOGGLE_VIDEO_SELECT;

export const CLEAR_VIDEO_SELECT = 'CLEAR_VIDEO_SELECT';
export type CLEAR_VIDEO_SELECT = typeof CLEAR_VIDEO_SELECT;
