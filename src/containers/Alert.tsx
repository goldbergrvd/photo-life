import axios from "axios";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addErrorMessage, addInfoMessage, AlertAction, MessagesAction, setAlert, setState, StateAction } from "../actions";
import { deletePhotos, PhotoListAction } from "../actions/photoList";
import { deleteVideos, VideoAction } from "../actions/videoList";
import api from "../api";
import Alert from "../components/Alert";
import { isImage, isVideo } from "../constants";
import { Alert as AlertState, State, StoreState } from "../types";

function mapStateToProps(state: StoreState) {
  return {
    alertState: state.alert,
    photoList: state.photoList,
    videoList: state.videoList,
    album: state.albumList.find(album => album.willDelete) || null
  }
}

function mapDispatchToProps(dispatch: Dispatch<AlertAction | PhotoListAction | VideoAction | StateAction | MessagesAction>) {
  return {
    deleteFiles: (names: string[]) => {
      dispatch(setAlert(AlertState.Deleting))

      axios.delete(api.delete, {
        headers: { 'Content-Type': 'application/json' },
        data: names
      })
      .then(res => {
        let deletedPhotosMap = new Map<string, boolean>()
        let deletedVideosMap = new Map<string, boolean>()

        for (let [k, v] of Object.entries(res.data)) {
          if (isImage(k)) {
            deletedPhotosMap.set(k, v as boolean)
          }
          if (isVideo(k)) {
            deletedVideosMap.set(k, v as boolean)
          }
        }

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
    deleteAlbum: (id: number) => {
      console.log(id)
    },
    cancel: () => dispatch(setAlert(AlertState.None))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
