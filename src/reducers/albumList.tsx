import { AlbumListAction } from "../actions/albumList";
import { ADD_ALBUM, BROWSE_ALBUM, CLEAR_ALBUM_PHOTO_BROWSE, CLEAR_ALBUM_PHOTO_SELECT, CLEAR_BROWSE_ALBUM, DELETE_ALBUM, NEXT_ALBUM_PHOTO_BROWSE, OPEN_ALBUM_PHOTO_BROWSE, PREV_ALBUM_PHOTO_BROWSE, TOGGLE_ALBUM_PHOTO_SELECT, UPDATE_ALBUM, WILL_DELETE_ALBUM } from "../constants";
import { AlbumList } from "../types";

export default function albumListReducer(albumList: AlbumList = [], action: AlbumListAction): AlbumList {
  switch(action.type) {
    case ADD_ALBUM:
      return action.payload.concat(albumList)

    case DELETE_ALBUM:
      return albumList.filter(album => album.id !== action.payload.id)

    case UPDATE_ALBUM:
      return albumList.map(album => {
        if (album.id === action.payload.id) {
           let newAlbum = action.payload
           newAlbum.browsing = album.browsing
           return newAlbum
        } else {
          return album
        }
      })

    case TOGGLE_ALBUM_PHOTO_SELECT:
      return albumList.map(album => {
        if (album.browsing) {
          album.photoList[action.payload].selected = !album.photoList[action.payload].selected
          return {...album}
        }
        return album
      })

    case CLEAR_ALBUM_PHOTO_SELECT:
      return albumList.map(album => {
        if (album.browsing) {
          album.photoList.forEach(photo => {
            photo.selected = false
          })
          return {...album}
        }
        return album
      })

    case BROWSE_ALBUM:
      return albumList.map(album => {
        if (album.id === action.payload.id) {
          album.browsing = true
        }
        return album
      })

    case CLEAR_BROWSE_ALBUM:
      return albumList.map(album => {
        album.browsing = false
        return album
      })

    case WILL_DELETE_ALBUM:
      return albumList.map(album => {
        album.willDelete = album.id === action.payload.id
        return album
      })

    case OPEN_ALBUM_PHOTO_BROWSE:
      return albumList.map(album => {
        if (album.browsing) {
          album.photoList = [...album.photoList]
          album.photoList[action.payload].browsed = true
          return album
        }
        return album
      })

    case CLEAR_ALBUM_PHOTO_BROWSE:
      return albumList.map(album => {
        if (album.browsing) {
          album.photoList = album.photoList.map(p => {
            p.browsed = false
            return p
          })
        }
        return album
      })

    case PREV_ALBUM_PHOTO_BROWSE:
      return albumList.map(album => {
        if (album.browsing) {
          let browsedIndex = album.photoList.findIndex(photo => photo.browsed)
          if (browsedIndex > 0) {
            let newPhotoList = [...album.photoList]
            newPhotoList[browsedIndex].browsed = false
            newPhotoList[browsedIndex - 1].browsed = true
            album.photoList = newPhotoList
            return album
          }
        }
        return album
      })

    case NEXT_ALBUM_PHOTO_BROWSE:
      return albumList.map(album => {
        if (album.browsing) {
          let browsedIndex = album.photoList.findIndex(photo => photo.browsed)
          if (browsedIndex < album.photoList.length - 1) {
            let newPhotoList = [...album.photoList]
            newPhotoList[browsedIndex].browsed = false
            newPhotoList[browsedIndex + 1].browsed = true
            album.photoList = newPhotoList
            return album
          }
        }
        return album
      })

    default:
      return albumList
  }
}
