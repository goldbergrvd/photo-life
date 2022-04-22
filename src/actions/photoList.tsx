import { ADD_PHOTOS, CLEAR_PHOTO_BROWSE, OPEN_PHOTO_BROWSE, TOGGLE_PHOTO_SELECT, CLEAR_PHOTO_SELECT, NEXT_PHOTO_BROWSE, PREV_PHOTO_BROWSE, DELETE_PHOTOS, UPDATE_PHOTOS } from "../constants";
import { PhotoList } from "../types";

export interface AddPhotos {
  type: ADD_PHOTOS;
  payload: PhotoList;
}

export interface UpdatePhotos {
  type: UPDATE_PHOTOS;
  payload: PhotoList;
}

export interface DeletePhotos {
  type: DELETE_PHOTOS;
  payload: Map<string, boolean>;
}

export interface OpenPhotoBrowse {
  type: OPEN_PHOTO_BROWSE;
  payload: number;
}

export interface ClearPhotoBrowse {
  type: CLEAR_PHOTO_BROWSE;
}

export interface PrevPhotoBrowse {
  type: PREV_PHOTO_BROWSE;
}

export interface NextPhotoBrowse {
  type: NEXT_PHOTO_BROWSE;
}

export interface TogglePhotoSelect {
  type: TOGGLE_PHOTO_SELECT;
  payload: number;
}

export interface ClearPhotoSelect {
  type: CLEAR_PHOTO_SELECT;
}

export type PhotoListAction = AddPhotos | UpdatePhotos | DeletePhotos | OpenPhotoBrowse | ClearPhotoBrowse | PrevPhotoBrowse | NextPhotoBrowse | TogglePhotoSelect | ClearPhotoSelect;

export function addPhotos(names: string[]): AddPhotos {
  return {
    type: ADD_PHOTOS,
    payload: names.map(name => ({
      name,
      browsed: false,
      selected: false
    }))
  }
}

export function updatePhotos(names: string[]): UpdatePhotos {
  return {
    type: UPDATE_PHOTOS,
    payload: names.map(name => ({
      name,
      browsed: false,
      selected: false
    }))
  }
}

export function deletePhotos(deleteMap: Map<string, boolean>): DeletePhotos {
  return {
    type: DELETE_PHOTOS,
    payload: deleteMap
  }
}

export function openPhotoBrowse(index: number): OpenPhotoBrowse {
  return {
    type: OPEN_PHOTO_BROWSE,
    payload: index
  }
}

export function clearPhotoBrowse(): ClearPhotoBrowse {
  return {
    type: CLEAR_PHOTO_BROWSE
  }
}

export function prevPhotoBrowse(): PrevPhotoBrowse {
  return {
    type: PREV_PHOTO_BROWSE
  }
}

export function nextPhotoBrowse(): NextPhotoBrowse {
  return {
    type: NEXT_PHOTO_BROWSE
  }
}

export function togglePhotoSelect(index: number): TogglePhotoSelect {
  return {
    type: TOGGLE_PHOTO_SELECT,
    payload: index
  }
}

export function clearPhotoSelect(): ClearPhotoSelect {
  return {
    type: CLEAR_PHOTO_SELECT
  }
}