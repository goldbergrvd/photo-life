import { ADD_PHOTOS, CLEAR_PHOTO_BROWSE, OPEN_PHOTO_BROWSE, TOGGLE_PHOTO_SELECT, CLEAR_PHOTO_SELECT } from "../constants";
import { PhotoList } from "../types";

export interface AddPhotos {
  type: ADD_PHOTOS,
  payload: PhotoList
}

export interface OpenPhotoBrowse {
  type: OPEN_PHOTO_BROWSE,
  payload: number
}

export interface ClearPhotoBrowse {
  type: CLEAR_PHOTO_BROWSE
}

export interface TogglePhotoSelect {
  type: TOGGLE_PHOTO_SELECT,
  payload: number
}

export interface ClearPhotoSelect {
  type: CLEAR_PHOTO_SELECT,
}

export type PhotoListAction = AddPhotos | OpenPhotoBrowse | ClearPhotoBrowse | TogglePhotoSelect | ClearPhotoSelect;

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