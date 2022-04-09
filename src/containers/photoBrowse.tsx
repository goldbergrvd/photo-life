import { connect } from "react-redux";
import { Dispatch } from "redux";
import { clearPhotoBrowse, PhotoListAction } from "../actions/photoList";
import PhotoBrowse from "../components/photoBrowse";
import { StoreState } from "../types";

function mapStateToProps(state: StoreState) {
  return {
    photoList: state.photoList
  }
}

function mapDispatchToProps(dispatch: Dispatch<PhotoListAction>) {
  return {
    onClose: () => dispatch(clearPhotoBrowse())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoBrowse);
