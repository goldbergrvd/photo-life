import { BROWSE_ALBUM, CLEAR_BROWSE_ALBUM, WILL_DELETE_ALBUM } from "../constants"

export interface BrowseAlbum {
  type: BROWSE_ALBUM;
  payload: {
    id: number
  }
}

export interface ClearBrowseAlbum {
  type: CLEAR_BROWSE_ALBUM;
}

export interface DeleteAlbum {
  type: WILL_DELETE_ALBUM;
  payload: {
    id: number
  }
}

export type AlbumListAction = BrowseAlbum | ClearBrowseAlbum | DeleteAlbum;

export function browseAlbum(id: number): AlbumListAction {
  return {
    type: BROWSE_ALBUM,
    payload: { id }
  }
}

export function clearBrowseAlbum(): AlbumListAction {
  return {
    type: CLEAR_BROWSE_ALBUM
  }
}

export function willDeleteAlbum(id: number): AlbumListAction {
  return {
    type: WILL_DELETE_ALBUM,
    payload: { id }
  }
}
