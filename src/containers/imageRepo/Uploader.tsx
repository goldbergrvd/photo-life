import axios from "axios";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setUploadProgress, UploadProgressAction } from "../../actions";
import { setState, StateAction } from "../../actions/state";
import Uploader from "../../components/imageRepo/Uploader";
import { State, StoreState } from "../../types";

function mapStateToProps(state: StoreState) {
  return {
    state: state.state,
    uploadProgress: state.uploadProgress
  }
}

function mapDispatchToProps(dispatch: Dispatch<StateAction | UploadProgressAction>) {
  return {
    upload: (formData: FormData) => {
      console.log(formData)

      dispatch(setState(State.Upload))

      setTimeout(() => {
        dispatch(setUploadProgress(20))
      }, 1000)

      setTimeout(() => {
        dispatch(setUploadProgress(40))
      }, 2000)

      setTimeout(() => {
        dispatch(setUploadProgress(60))
      }, 3000)
      setTimeout(() => {
        dispatch(setUploadProgress(80))
      }, 4000)

      setTimeout(() => {
        dispatch(setState(State.Browse))
        dispatch(setUploadProgress(0))
      }, 5000)
      // const config = {
      //   onUploadProgress: function(progressEvent: { loaded: number; total: number; }) {
      //     var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
      //     console.log(percentCompleted)
      //   }
      // }

      // axios.post('/upload', formData, config)
      //     .then(res => {
      //       console.log(res)
      //     })
      //     .catch(err => {
      //       console.log(err)
      //     })
      //     .finally(() => {

      //     })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Uploader)