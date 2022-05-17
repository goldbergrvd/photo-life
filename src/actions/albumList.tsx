import { ADD_ALBUM, BROWSE_ALBUM, CLEAR_ALBUM_PHOTO_BROWSE, CLEAR_ALBUM_PHOTO_SELECT, CLEAR_BROWSE_ALBUM, DELETE_ALBUM, NEXT_ALBUM_PHOTO_BROWSE, OPEN_ALBUM_PHOTO_BROWSE, PREV_ALBUM_PHOTO_BROWSE, TOGGLE_ALBUM_PHOTO_SELECT, UPDATE_ALBUM, WILL_DELETE_ALBUM } from "../constants"
import { Album, AlbumList } from "../types";

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

export interface UpdateAlbum {
  type: UPDATE_ALBUM;
  payload: Album;
}

export interface ToggleAlbumPhotoSelect {
  type: TOGGLE_ALBUM_PHOTO_SELECT;
  payload: number;
}

export interface ClearAlbumPhotoSelect {
  type: CLEAR_ALBUM_PHOTO_SELECT;
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

export interface OpenAlbumPhotoBrowse {
  type: OPEN_ALBUM_PHOTO_BROWSE;
  payload: number;
}

export interface ClearAlbumPhotoBrowse {
  type: CLEAR_ALBUM_PHOTO_BROWSE;
}

export interface PrevAlbumPhotoBrowse {
  type: PREV_ALBUM_PHOTO_BROWSE;
}

export interface NextAlbumPhotoBrowse {
  type: NEXT_ALBUM_PHOTO_BROWSE;
}

export type AlbumListAction = AddAlbum | DeleteAlbum | UpdateAlbum | ToggleAlbumPhotoSelect | ClearAlbumPhotoSelect | BrowseAlbum | ClearBrowseAlbum | WillDeleteAlbum | OpenAlbumPhotoBrowse | ClearAlbumPhotoBrowse | PrevAlbumPhotoBrowse | NextAlbumPhotoBrowse;

export function addAlbum(albums: AlbumList): AlbumListAction {
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

export function updateAlbum(album: Album): AlbumListAction {
  return {
    type: UPDATE_ALBUM,
    payload: album
  }
}

export function toggleAlbumPhotoSelect(index: number): AlbumListAction {
  return {
    type: TOGGLE_ALBUM_PHOTO_SELECT,
    payload: index
  }
}

export function clearAlbumPhotoSelect(): AlbumListAction {
  return {
    type: CLEAR_ALBUM_PHOTO_SELECT
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

export function openAlbumPhotoBrowse(index: number): AlbumListAction {
  return {
    type: OPEN_ALBUM_PHOTO_BROWSE,
    payload: index
  }
}

export function clearAlbumPhotoBrowse(): AlbumListAction {
  return {
    type: CLEAR_ALBUM_PHOTO_BROWSE
  }
}

export function prevAlbumPhotoBrowse(): AlbumListAction {
  return {
    type: PREV_ALBUM_PHOTO_BROWSE
  }
}

export function nextAlbumPhotoBrowse(): AlbumListAction {
  return {
    type: NEXT_ALBUM_PHOTO_BROWSE
  }
}