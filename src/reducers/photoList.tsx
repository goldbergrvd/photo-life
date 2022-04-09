import { PhotoListAction } from "../actions/photoList";
import { ADD_PHOTO, CLEAR_PHOTO_BROWSE, OPEN_PHOTO_BROWSE, TOGGLE_PHOTO_SELECT } from "../constants";
import { PhotoList } from "../types";

export default function (photoList: PhotoList = [], action: PhotoListAction): PhotoList {
  const newPhotoList = [...photoList]

  switch(action.type) {
    case ADD_PHOTO:
      return newPhotoList.concat([action.payload])

    case TOGGLE_PHOTO_SELECT:
      newPhotoList[action.payload].selected = !newPhotoList[action.payload].selected
      return newPhotoList

    case OPEN_PHOTO_BROWSE:
      newPhotoList[action.payload].browsed = true
      return newPhotoList

    case CLEAR_PHOTO_BROWSE:
      return photoList.map(photo => {
        photo.browsed = false
        return photo
      })

    default:
      return photoList
  }
}