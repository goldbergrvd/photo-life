import axios from "axios";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setUploadProgress, UploadProgressAction } from "../../actions";
import { PhotoListAction, updatePhotos } from "../../actions/photoList";
import { setState, StateAction } from "../../actions/state";
import { updateVideos, VideoAction } from "../../actions/videoList";
import api from "../../api";
import Uploader from "../../components/fileRepo/Uploader";
import { isImage, isVideo } from "../../constants";
import { State, StoreState } from "../../types";

function mapStateToProps(state: StoreState) {
  return {
    state: state.state
  }
}

function mapDispatchToProps(dispatch: Dispatch<StateAction | UploadProgressAction | PhotoListAction | VideoAction>) {
  return {
    upload: (formData: FormData) => {
      dispatch(setState(State.Upload))

      const config = {
        onUploadProgress: function(progressEvent: { loaded: number; total: number; }) {
          var progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          dispatch(setUploadProgress(progress))
        }
      }

      axios.post(api.upload, formData, config)
          .then(res => {
            let datas = res.data.reduce((acc: {photos: string[], videos: string[]}, d: string) => {
              if (isImage(d)) {
                acc.photos.push(d)
              }
              if (isVideo(d)) {
                acc.videos.push(d)
              }
              return acc
            }, { photos: [], videos: [] })

            dispatch(updatePhotos(datas.photos))
            dispatch(updateVideos(datas.videos))
          })
          .catch(err => {
            console.log(err)
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