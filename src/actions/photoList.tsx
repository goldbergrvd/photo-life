import { ADD_PHOTO, TOGGLE_PHOTO_SELECT } from "../constants";
import { Photo } from "../types";

export interface AddPhoto {
  type: ADD_PHOTO,
  payload: Photo
}

export interface TogglePhotoSelect {
  type: TOGGLE_PHOTO_SELECT,
  payload: number
}

export type PhotoListAction = AddPhoto | TogglePhotoSelect;

export function addPhoto(name: string): AddPhoto {
  return {
    type: ADD_PHOTO,
    payload: {
      name,
      selected: false
    }
  }
}

export function togglePhotoSelect(index: number): TogglePhotoSelect {
  return {
    type: TOGGLE_PHOTO_SELECT,
    payload: index
  }
}