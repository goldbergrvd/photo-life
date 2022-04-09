import { PhotoListAction } from "../actions/photoList";
import { ADD_PHOTO, TOGGLE_PHOTO_SELECT } from "../constants";
import { PhotoList } from "../types";

export default function (photoList: PhotoList = [], action: PhotoListAction): PhotoList {
  switch(action.type) {
    case ADD_PHOTO:
      return [...photoList, action.payload]
    case TOGGLE_PHOTO_SELECT:
      const newPhotoList = [...photoList]
      newPhotoList[action.payload].selected = !newPhotoList[action.payload].selected
      return newPhotoList
    default:
      return photoList
  }
}