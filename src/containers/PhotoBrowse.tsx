import { connect } from "react-redux";
import { Dispatch } from "redux";
import { openPhotoBrowseInfo, DisplayAction, togglePhotoBrowseInfo } from "../actions";
import { clearPhotoBrowse, nextPhotoBrowse, PhotoListAction, prevPhotoBrowse } from "../actions/photoList";
import PhotoBrowse from "../components/PhotoBrowse";
import { StoreState } from "../types";

function mapStateToProps(state: StoreState) {
  return {
    photoList: state.photoList,
    showInfo: state.display.photoBrowseInfo
  }
}

function mapDispatchToProps(dispatch: Dispatch<PhotoListAction | DisplayAction>) {
  return {
    toggleShowInfo: () => dispatch(togglePhotoBrowseInfo()),
    openShowInfo: () => dispatch(openPhotoBrowseInfo()),
    onClose: () => dispatch(clearPhotoBrowse()),
    prevPhotoBrowse: () => dispatch(prevPhotoBrowse()),
    nextPhotoBrowse: () => dispatch(nextPhotoBrowse())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoBrowse);
