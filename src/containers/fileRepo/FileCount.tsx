import { connect } from "react-redux";
import { Dispatch } from "redux";
import { FileCountColorAction, setFileCountColor } from "../../actions/fileCountColor";
import FileCount from "../../components/fileRepo/FileCount";
import { StoreState } from "../../types";

function mapStateToProps(state: StoreState) {
  return {
    photoList: state.photoList,
    videoList: state.videoList,
    tab: state.tab,
    color: state.fileCountColor
  }
}

function mapDispatchToProps(dispatch: Dispatch<FileCountColorAction>) {
  return {
    setColor: (color: string) => dispatch(setFileCountColor(color))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileCount)
