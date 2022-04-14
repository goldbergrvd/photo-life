import { PhotoListAction } from "../actions/photoList";
import { ADD_PHOTOS, CLEAR_PHOTO_BROWSE, CLEAR_PHOTO_SELECT, OPEN_PHOTO_BROWSE, TOGGLE_PHOTO_SELECT } from "../constants";
import { PhotoList } from "../types";

export default function (photoList: PhotoList = [], action: PhotoListAction): PhotoList {
  let newPhotoList

  switch(action.type) {
    case ADD_PHOTOS:
      return action.payload.concat([...photoList])

    case OPEN_PHOTO_BROWSE:
      newPhotoList = [...photoList]
      newPhotoList[action.payload].browsed = true
      return newPhotoList

    case CLEAR_PHOTO_BROWSE:
      return photoList.map(photo => {
        photo.browsed = false
        return photo
      })

    case TOGGLE_PHOTO_SELECT:
      newPhotoList = [...photoList]
      newPhotoList[action.payload].selected = !newPhotoList[action.payload].selected
      return newPhotoList

    case CLEAR_PHOTO_SELECT:
      return photoList.map(photo => {
        photo.selected = false
        return photo
      })

    default:
      return photoList
  }
}