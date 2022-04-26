export enum Tab {
  ImageRepo = 1,
  VideoRepo = 2,
  Album = 3
}

export enum State {
  Browse = 1,
  Upload = 2,
  Select = 3
}

export enum Alert {
  None = 1,
  DeletePhotoCheck = 2,
  DeleteVideoCheck = 3,
  Deleting = 4,
  AddAlbumCheck = 5,
  AddAlbum = 6
}

export enum MessageType {
  Info = 1,
  Error = 2
}

export interface Message {
  type: MessageType;
  title: string;
  content: string;
  time: Date;
}

export type Timestamp = number

export type Messages = Map<Timestamp, Message>

export interface Photo {
  name: string;
  browsed: boolean;
  selected: boolean;
}

export type PhotoList = Array<Photo>

export interface VideoBuffer {
  start: number;
  end: number
}

export interface Video {
  name: string;
  play: boolean;
  fullscreen: boolean;
  selected: boolean;
  currentTime: number;
  duration: number;
  buffers: Array<VideoBuffer>
}

export type VideoList = Array<Video>

export interface StoreState {
  tab: Tab;
  state: State;
  alert: Alert;
  photoList: PhotoList;
  videoList: VideoList;
  uploadProgress: number;
  fileCountColor: string;
  messages: Messages;
}
