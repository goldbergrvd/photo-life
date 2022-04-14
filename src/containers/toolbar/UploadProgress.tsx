import { connect } from "react-redux";
import UploadProgress from "../../components/toolbar/UploadProgress";
import { StoreState } from "../../types";

function mapStateToProps(state: StoreState) {
  return {
    progress: state.uploadProgress
  }
}

export default connect(mapStateToProps)(UploadProgress);
