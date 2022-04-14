import axios from "axios";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setUploadProgress, UploadProgressAction } from "../../actions";
import { addPhotos, PhotoListAction } from "../../actions/photoList";
import { setState, StateAction } from "../../actions/state";
import Uploader from "../../components/imageRepo/Uploader";
import { State, StoreState } from "../../types";

function mapStateToProps(state: StoreState) {
  return {
    state: state.state
  }
}

function mapDispatchToProps(dispatch: Dispatch<StateAction | UploadProgressAction | PhotoListAction>) {
  return {
    upload: (formData: FormData) => {
      dispatch(setState(State.Upload))

      const config = {
        onUploadProgress: function(progressEvent: { loaded: number; total: number; }) {
          var progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          dispatch(setUploadProgress(progress))
        }
      }

      axios.post('/upload', formData, config)
          .then(res => {
            dispatch(addPhotos(res.data))
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