import { connect } from "react-redux";
import FileCount from "../../components/fileRepo/FileCount";
import { StoreState } from "../../types";

function mapStateToProps(state: StoreState) {
  return {
    photoList: state.photoList,
    videoList: state.videoList,
    tab: state.tab
  }
}

export default connect(mapStateToProps)(FileCount)
