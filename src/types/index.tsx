export enum Tab {
  Images = 1,
  Album = 2
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
}
