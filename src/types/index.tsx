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

export interface Photo {
  name: string;
  browsed: boolean;
  selected: boolean;
}

export type PhotoList = Array<Photo>

export interface StoreState {
  tab: Tab;
  state: State;
  photoList: PhotoList;
  uploadProgress: number;
}
