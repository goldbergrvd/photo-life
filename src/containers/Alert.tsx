import axios from "axios";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AlertAction, setAlert, setState, StateAction } from "../actions";
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
    videoList: state.videoList
  }
}

function mapDispatchToProps(dispatch: Dispatch<AlertAction | PhotoListAction | VideoAction | StateAction>) {
  return {
    onDelete: (names: string[]) => {
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

        dispatch(deletePhotos(deletedPhotosMap))
        dispatch(deleteVideos(deletedVideosMap))
      })
      .catch(err => console.log(err))
      .finally(() => {
        setTimeout(() => {
          dispatch(setAlert(AlertState.None))
          dispatch(setState(State.Browse))
        }, 1500)
      })
    },
    onCancel: () => dispatch(setAlert(AlertState.None))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
