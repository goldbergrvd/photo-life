import { PhotoListAction } from "../actions/photoList";
import { ADD_PHOTOS, CLEAR_PHOTO_BROWSE, CLEAR_PHOTO_SELECT, DELETE_PHOTOS, NEXT_PHOTO_BROWSE, OPEN_PHOTO_BROWSE, PREV_PHOTO_BROWSE, TOGGLE_PHOTO_SELECT, UPDATE_PHOTOS } from "../constants";
import { PhotoList } from "../types";

export default function photoListReducer (photoList: PhotoList = [], action: PhotoListAction): PhotoList {
  let newPhotoList, browsedIndex

  switch(action.type) {
    case ADD_PHOTOS:
      return [...photoList].concat(action.payload)

    case UPDATE_PHOTOS:
      newPhotoList = [...photoList]
      newPhotoList = newPhotoList.concat(action.payload)
      newPhotoList.sort((a, b) => {
        if (a.name > b.name) return -1
        if (a.name < b.name) return 1
        return 0
      })
      return newPhotoList

    case DELETE_PHOTOS:
      return photoList.filter(photo => {
        return !action.payload.get(photo.name)
      })

    case OPEN_PHOTO_BROWSE:
      newPhotoList = [...photoList]
      newPhotoList[action.payload].browsed = true
      return newPhotoList

    case CLEAR_PHOTO_BROWSE:
      return photoList.map(photo => {
        photo.browsed = false
        return photo
      })

    case PREV_PHOTO_BROWSE:
      browsedIndex = photoList.findIndex(photo => photo.browsed)
      if (browsedIndex > 0) {
        newPhotoList = [...photoList]
        newPhotoList[browsedIndex].browsed = false
        newPhotoList[browsedIndex - 1].browsed = true
        return newPhotoList
      }
      return photoList

    case NEXT_PHOTO_BROWSE:
      browsedIndex = photoList.findIndex(photo => photo.browsed)
      if (browsedIndex < photoList.length - 1) {
        newPhotoList = [...photoList]
        newPhotoList[browsedIndex].browsed = false
        newPhotoList[browsedIndex + 1].browsed = true
        return newPhotoList
      }
      return photoList

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