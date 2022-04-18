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
  DeletePhoto = 3,
  AddAlbumCheck = 4,
  AddAlbum = 5
}

export interface Photo {
  name: string;
  browsed: boolean;
  selected: boolean;
}

export type PhotoList = Array<Photo>

export interface StoreState {
  tab: Tab;
  state: State;
  alert: Alert;
  photoList: PhotoList;
  uploadProgress: number;
}
