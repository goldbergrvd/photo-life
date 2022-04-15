import { connect } from "react-redux";
import { Dispatch } from "redux";
import { clearPhotoBrowse, nextPhotoBrowse, PhotoListAction, prevPhotoBrowse } from "../actions/photoList";
import PhotoBrowse from "../components/PhotoBrowse";
import { StoreState } from "../types";

function mapStateToProps(state: StoreState) {
  return {
    photoList: state.photoList
  }
}

function mapDispatchToProps(dispatch: Dispatch<PhotoListAction>) {
  return {
    onClose: () => dispatch(clearPhotoBrowse()),
    prevPhotoBrowse: () => dispatch(prevPhotoBrowse()),
    nextPhotoBrowse: () => dispatch(nextPhotoBrowse())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoBrowse);
