import { ADD_ALBUM, BROWSE_ALBUM, CLEAR_BROWSE_ALBUM, DELETE_ALBUM, WILL_DELETE_ALBUM } from "../constants"
import { AlbumList } from "../types";

export interface AddAlbum {
  type: ADD_ALBUM;
  payload: AlbumList;
}

export interface DeleteAlbum {
  type: DELETE_ALBUM;
  payload: {
    id: string
  }
}

export interface BrowseAlbum {
  type: BROWSE_ALBUM;
  payload: {
    id: string
  }
}

export interface ClearBrowseAlbum {
  type: CLEAR_BROWSE_ALBUM;
}

export interface WillDeleteAlbum {
  type: WILL_DELETE_ALBUM;
  payload: {
    id: string
  }
}

export type AlbumListAction = AddAlbum | DeleteAlbum | BrowseAlbum | ClearBrowseAlbum | WillDeleteAlbum;

export function addAlbum(albums: AlbumList): AlbumListAction {
  albums.forEach(album => {
    album.browsing = false
    album.willDelete = false
  })
  return {
    type: ADD_ALBUM,
    payload: albums
  }
}

export function deleteAlbum(id: string): AlbumListAction {
  return {
    type: DELETE_ALBUM,
    payload: { id }
  }
}

export function browseAlbum(id: string): AlbumListAction {
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

export function willDeleteAlbum(id: string): AlbumListAction {
  return {
    type: WILL_DELETE_ALBUM,
    payload: { id }
  }
}
