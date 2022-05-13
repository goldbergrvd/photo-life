import { AlbumListAction } from "../actions/albumList";
import { ADD_ALBUM, BROWSE_ALBUM, CLEAR_BROWSE_ALBUM, DELETE_ALBUM, UPDATE_ALBUM, WILL_DELETE_ALBUM } from "../constants";
import { AlbumList } from "../types";

export default function albumListReducer(albumList: AlbumList = [], action: AlbumListAction): AlbumList {
  switch(action.type) {
    case ADD_ALBUM:
      return action.payload.concat(albumList)

    case DELETE_ALBUM:
      return albumList.filter(album => album.id !== action.payload.id)

    case UPDATE_ALBUM:
      return albumList.map(album => album.id === action.payload.id ? action.payload : album)

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

    default:
      return albumList
  }
}
