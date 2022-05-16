import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addErrorMessage, addInfoMessage, AlertAction, MessagesAction, setAlert, setState, StateAction } from "../actions";
import { AlbumListAction, deleteAlbum } from "../actions/albumList";
import { deletePhotos, PhotoListAction } from "../actions/photoList";
import { deleteVideos, VideoAction } from "../actions/videoList";
import requests from "../api";
import Alert from "../components/Alert";
import { isImage, isVideo } from "../constants";
import { Album, Alert as AlertState, State, StoreState } from "../types";

function mapStateToProps(state: StoreState) {
  return {
    alertState: state.alert,
    photoList: state.photoList,
    videoList: state.videoList,
    album: state.albumList.find(album => album.willDelete) || null
  }
}

function mapDispatchToProps(dispatch: Dispatch<AlertAction | PhotoListAction | VideoAction | StateAction | MessagesAction | AlbumListAction>) {
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
    cancel: () => dispatch(setAlert(AlertState.None))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
