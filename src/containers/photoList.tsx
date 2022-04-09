import { Dispatch } from "redux";
import { connect } from "react-redux";
import { openPhotoBrowse, PhotoListAction, togglePhotoSelect } from "../actions/photoList";
import { StoreState } from "../types";
import PhotoList from "../components/photoList";

function mapStateToProps(state: StoreState) {
  return {
    photoList: state.photoList,
    state: state.state
  }
}

function mapDispatchToProps(dispatch: Dispatch<PhotoListAction>) {
  return {
    onTogglePhotoSelect: (index: number) => dispatch(togglePhotoSelect(index)),
    onOpenPhotoBrowse: (index: number) => dispatch(openPhotoBrowse(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoList)
