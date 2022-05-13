export const IMAGE_EXT_LIST = ['.jpg', '.jpeg', '.png'];
export const VIDEO_EXT_LIST = ['.mp4', '.mov'];

export const isImage = (filename: string) => (
  IMAGE_EXT_LIST.includes(filename.substring(filename.lastIndexOf('.')).toLowerCase())
);
export const isVideo = (filename: string) => (
  VIDEO_EXT_LIST.includes(filename.substring(filename.lastIndexOf('.')).toLowerCase())
);

export const COLOR_WHITE = 'rgb(255, 255, 255)';
export const COLOR_BLACK = 'rgb(0, 0, 0)';

export const SET_TAB = 'SET_TAB'; // eslint-disable-next-line
export type SET_TAB = typeof SET_TAB;

export const SET_STATE = 'SET_STATE'; // eslint-disable-next-line
export type SET_STATE = typeof SET_STATE;

export const SET_ALERT = 'SET_ALERT'; // eslint-disable-next-line
export type SET_ALERT = typeof SET_ALERT;

export const SET_VIEW_TYPE = 'SET_VIEW_TYPE'; // eslint-disable-next-line
export type SET_VIEW_TYPE = typeof SET_VIEW_TYPE;


export const ADD_INFO_MESSAGE = 'ADD_INFO_MESSAGE'; // eslint-disable-next-line
export type ADD_INFO_MESSAGE = typeof ADD_INFO_MESSAGE;

export const ADD_ERROR_MESSAGE = 'ADD_ERROR_MESSAGE'; // eslint-disable-next-line
export type ADD_ERROR_MESSAGE = typeof ADD_ERROR_MESSAGE;

export const DELETE_MESSAGE = 'DELETE_MESSAGE'; // eslint-disable-next-line
export type DELETE_MESSAGE = typeof DELETE_MESSAGE;


export const ADD_PHOTOS = 'ADD_PHOTOS'; // eslint-disable-next-line
export type ADD_PHOTOS = typeof ADD_PHOTOS;

export const UPDATE_PHOTOS = 'UPDATE_PHOTOS'; // eslint-disable-next-line
export type UPDATE_PHOTOS = typeof UPDATE_PHOTOS;

export const DELETE_PHOTOS = 'DELETE_PHOTOS'; // eslint-disable-next-line
export type DELETE_PHOTOS = typeof DELETE_PHOTOS;

export const OPEN_PHOTO_BROWSE = 'OPEN_PHOTO_BROWSE'; // eslint-disable-next-line
export type OPEN_PHOTO_BROWSE = typeof OPEN_PHOTO_BROWSE;

export const CLEAR_PHOTO_BROWSE = 'CLEAR_PHOTO_BROWSE'; // eslint-disable-next-line
export type CLEAR_PHOTO_BROWSE = typeof CLEAR_PHOTO_BROWSE;

export const PREV_PHOTO_BROWSE = 'PREV_PHOTO_BROWSE'; // eslint-disable-next-line
export type PREV_PHOTO_BROWSE = typeof PREV_PHOTO_BROWSE;

export const NEXT_PHOTO_BROWSE = 'NEXT_PHOTO_BROWSE'; // eslint-disable-next-line
export type NEXT_PHOTO_BROWSE = typeof NEXT_PHOTO_BROWSE;

export const TOGGLE_PHOTO_SELECT = 'TOGGLE_PHOTO_SELECT'; // eslint-disable-next-line
export type TOGGLE_PHOTO_SELECT = typeof TOGGLE_PHOTO_SELECT;

export const CLEAR_PHOTO_SELECT = 'CLEAR_PHOTO_SELECT'; // eslint-disable-next-line
export type CLEAR_PHOTO_SELECT = typeof CLEAR_PHOTO_SELECT;


export const SET_UPLOAD_PROGRESS = 'SET_UPLOAD_PROGRESS'; // eslint-disable-next-line
export type SET_UPLOAD_PROGRESS = typeof SET_UPLOAD_PROGRESS;


export const TOGGLE_PHOTO_BROWSE_INFO = 'TOGGLE_PHOTO_BROWSE_INFO'; // eslint-disable-next-line
export type TOGGLE_PHOTO_BROWSE_INFO = typeof TOGGLE_PHOTO_BROWSE_INFO;

export const OPEN_PHOTO_BROWSE_INFO = 'OPEN_PHOTO_BROWSE_INFO'; // eslint-disable-next-line
export type OPEN_PHOTO_BROWSE_INFO = typeof OPEN_PHOTO_BROWSE_INFO;

export const OPEN_VIDEO_CONTROLS = 'OPEN_VIDEO_CONTROLS'; // eslint-disable-next-line
export type OPEN_VIDEO_CONTROLS = typeof OPEN_VIDEO_CONTROLS;

export const CLOSE_VIDEO_CONTROLS = 'CLOSE_VIDEO_CONTROLS'; // eslint-disable-next-line
export type CLOSE_VIDEO_CONTROLS = typeof CLOSE_VIDEO_CONTROLS;

export const ADD_VIDEOS = 'ADD_VIDEOS'; // eslint-disable-next-line
export type ADD_VIDEOS = typeof ADD_VIDEOS;

export const UPDATE_VIDEOS = 'UPDATE_VIDEOS'; // eslint-disable-next-line
export type UPDATE_VIDEOS = typeof UPDATE_VIDEOS;

export const DELETE_VIDEOS = 'DELETE_VIDEOS'; // eslint-disable-next-line
export type DELETE_VIDEOS = typeof DELETE_VIDEOS;

export const PLAY_VIDEO = 'PLAY_VIDEO'; // eslint-disable-next-line
export type PLAY_VIDEO = typeof PLAY_VIDEO;

export const PAUSE_VIDEO = 'PAUSE_VIDEO'; // eslint-disable-next-line
export type PAUSE_VIDEO = typeof PAUSE_VIDEO;

export const OPEN_VIDEO_FULLSCREEN = 'OPEN_VIDEO_FULLSCREEN'; // eslint-disable-next-line
export type OPEN_VIDEO_FULLSCREEN = typeof OPEN_VIDEO_FULLSCREEN;

export const CLOSE_VIDEO_FULLSCREEN = 'CLOSE_VIDEO_FULLSCREEN'; // eslint-disable-next-line
export type CLOSE_VIDEO_FULLSCREEN = typeof CLOSE_VIDEO_FULLSCREEN;

export const SET_VIDEO_TIME = 'SET_VIDEO_TIME'; // eslint-disable-next-line
export type SET_VIDEO_TIME = typeof SET_VIDEO_TIME;

export const SET_VIDEO_BUFFERS = 'SET_VIDEO_BUFFERS'; // eslint-disable-next-line
export type SET_VIDEO_BUFFERS = typeof SET_VIDEO_BUFFERS;

export const TOGGLE_VIDEO_SELECT = 'TOGGLE_VIDEO_SELECT'; // eslint-disable-next-line
export type TOGGLE_VIDEO_SELECT = typeof TOGGLE_VIDEO_SELECT;

export const CLEAR_VIDEO_SELECT = 'CLEAR_VIDEO_SELECT'; // eslint-disable-next-line
export type CLEAR_VIDEO_SELECT = typeof CLEAR_VIDEO_SELECT;


export const ADD_ALBUM = 'ADD_ALBUM'; // eslint-disable-next-line
export type ADD_ALBUM = typeof ADD_ALBUM;

export const DELETE_ALBUM = 'DELETE_ALBUM'; // eslint-disable-next-line
export type DELETE_ALBUM = typeof DELETE_ALBUM;

export const BROWSE_ALBUM = 'BROWSE_ALBUM'; // eslint-disable-next-line
export type BROWSE_ALBUM = typeof BROWSE_ALBUM;

export const CLEAR_BROWSE_ALBUM = 'CLEAR_BROWSE_ALBUM'; // eslint-disable-next-line
export type CLEAR_BROWSE_ALBUM = typeof CLEAR_BROWSE_ALBUM;

export const WILL_DELETE_ALBUM = 'WILL_DELETE_ALBUM'; // eslint-disable-next-line
export type WILL_DELETE_ALBUM = typeof WILL_DELETE_ALBUM;
