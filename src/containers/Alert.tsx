import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addErrorMessage, addInfoMessage, AlertAction, MessagesAction, setAlert, setState, StateAction } from "../actions";
import { AlbumListAction, deleteAlbum, updateAlbum } from "../actions/albumList";
import { deletePhotos, PhotoListAction } from "../actions/photoList";
import { deleteVideos, VideoAction } from "../actions/videoList";
import requests from "../api";
import Alert from "../components/Alert";
import { Album, Alert as AlertState, PhotoList, State, StoreState, VideoList } from "../types";

interface StateProps {
  hide: boolean;
  submitContent: string | JSX.Element;
  alertState: AlertState;
  photoList: PhotoList;
  videoList: VideoList;
  album: Album | null;
}

interface DispatchProps {
  deleteMedias: (names: string[]) => void;
  deleteAlbum: (album: Album) => void;
  deleteAlbumPhoto: (id: string, photoNames: string[]) => void;
  cancel: () => void;
}

function mapStateToProps(state: StoreState): StateProps {
  let album = state.albumList.find(album => album.willDelete) ||
              state.albumList.find(album => album.photoList.some(p => p.selected)) ||
              null
  let submitContent: string | JSX.Element = ''
  switch (state.alert) {
    case AlertState.DeletePhotoCheck:
      submitContent = '刪除照片'
      break
    case AlertState.DeleteVideoCheck:
      submitContent = '刪除影片'
      break
    case AlertState.DeleteAlbumCheck:
      submitContent = '刪除' + album!.name
      break
    case AlertState.DeleteAlbumPhotoCheck:
      submitContent = '刪除相簿照片'
      break
    case AlertState.DeletingMedia:
    case AlertState.DeletingAlbum:
    case AlertState.DeletingAlbumPhoto:
      submitContent = <FontAwesomeIcon icon={faRefresh} spin />
      break
  }
  return {
    hide: state.alert === AlertState.None,
    submitContent,
    alertState: state.alert,
    photoList: state.photoList,
    videoList: state.videoList,
    album
  }
}

function mapDispatchToProps(dispatch: Dispatch<AlertAction | PhotoListAction | VideoAction | StateAction | MessagesAction | AlbumListAction>): DispatchProps {
  return {
    deleteMedias: (names: string[]) => {
      dispatch(setAlert(AlertState.DeletingMedia))

      requests.delete(names)
        .then(({ deletedPhotosMap, deletedVideosMap }) => {
          if (deletedPhotosMap.size) {
            dispatch(deletePhotos(deletedPhotosMap))
            dispatch(addInfoMessage('刪除成功', `刪除了${deletedPhotosMap.size}張相片`))
          }
          if (deletedVideosMap.size) {
            dispatch(deleteVideos(deletedVideosMap))
            dispatch(addInfoMessage('刪除成功', `刪除了${deletedVideosMap.size}部影片`))
          }
        })
        .catch(err => {
          console.log(err)
          dispatch(addErrorMessage('刪除檔案時發生異常', err.response.data))
        })
        .finally(() => {
          setTimeout(() => {
            dispatch(setAlert(AlertState.None))
            dispatch(setState(State.Browse))
          }, 500)
        })
    },
    deleteAlbum: (album: Album) => {
      dispatch(setAlert(AlertState.DeletingAlbum))

      requests.deleteAlbum(album.id)
        .then(albumId => {
          dispatch(deleteAlbum(albumId + ''))
          dispatch(addInfoMessage('刪除成功', `刪除了相簿「${album.name}」`))
        })
        .catch(err => {
          dispatch(addErrorMessage('刪除相簿時發生異常', err.response.data))
        })
        .finally(() => {
          dispatch(setAlert(AlertState.None))
          dispatch(setState(State.Browse))
        })
    },
    deleteAlbumPhoto: (id: string, photoNames: string[]) => {
      dispatch(setAlert(AlertState.DeletingAlbumPhoto))

      requests.deleteAlbumPhoto(id, photoNames)
        .then(album => {
          dispatch(updateAlbum(album))
          dispatch(addInfoMessage('刪除成功', `刪除了相簿「${album.name}」中的${photoNames.length}張照片`))
        })
        .catch(err => {
          dispatch(addErrorMessage('刪除相簿照片時發生異常', err.response.data))
        })
        .finally(() => {
          dispatch(setAlert(AlertState.None))
          dispatch(setState(State.Browse))
        })
    },
    cancel: () => dispatch(setAlert(AlertState.None))
  }
}

function mergeProps(stateProps: StateProps, dispatchProps: DispatchProps) {
  return {
    hide: stateProps.hide,
    submitContent: stateProps.submitContent,
    cancel: dispatchProps.cancel,
    submit: () => {
      switch(stateProps.alertState) {
        case AlertState.DeletePhotoCheck:
          const selectedPhotos = stateProps.photoList.filter(photo => photo.selected)
          dispatchProps.deleteMedias(selectedPhotos.map(photo => photo.name))
          return

        case AlertState.DeleteVideoCheck:
          const selectedVideos = stateProps.videoList.filter(video => video.selected)
          dispatchProps.deleteMedias(selectedVideos.map(video => video.name))
          return

        case AlertState.DeleteAlbumCheck:
          dispatchProps.deleteAlbum(stateProps.album!)
          return

        case AlertState.DeleteAlbumPhotoCheck:
          let deletedPhotoNames = stateProps.album!.photoList.filter(p => p.selected).map(p => p.name)
          dispatchProps.deleteAlbumPhoto(stateProps.album!.id, deletedPhotoNames)
          return
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Alert);
