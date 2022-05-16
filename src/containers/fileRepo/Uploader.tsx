import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addErrorMessage, addErrorMessageMultiline, addInfoMessage, MessagesAction, setUploadProgress, UploadProgressAction } from "../../actions";
import { PhotoListAction, updatePhotos } from "../../actions/photoList";
import { setState, StateAction } from "../../actions/state";
import { updateVideos, VideoAction } from "../../actions/videoList";
import requests from "../../api";
import Uploader from "../../components/fileRepo/Uploader";
import { State, StoreState } from "../../types";

function mapStateToProps(state: StoreState) {
  return {
    state: state.state
  }
}

function mapDispatchToProps(dispatch: Dispatch<StateAction | UploadProgressAction | PhotoListAction | VideoAction | MessagesAction>) {
  return {
    upload: (formData: FormData) => {
      dispatch(setState(State.Upload))

      function onUploadProgress (progressEvent: { loaded: number; total: number; }) {
        var progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        dispatch(setUploadProgress(progress))
      }

      requests.upload(formData, onUploadProgress)
        .then(({photos, videos, errorFiles}) => {
          if (photos.length) {
            dispatch(updatePhotos(photos))
            dispatch(addInfoMessage('上傳成功', `上傳了${photos.length}張相片`))
          }
          if (videos.length) {
            dispatch(updateVideos(videos))
            dispatch(addInfoMessage('上傳成功', `上傳了${videos.length}部影片`))
          }
          if (errorFiles.length) {
            dispatch(addErrorMessageMultiline('部分檔案上傳失敗', errorFiles as Array<string>))
          }
        })
        .catch(err => {
          console.log(err)
          dispatch(addErrorMessage('上傳檔案時發生異常', err.response.data))
        })
        .finally(() => {
          setTimeout(() => {
            dispatch(setUploadProgress(0))
            dispatch(setState(State.Browse))
          }, 1000)
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Uploader)