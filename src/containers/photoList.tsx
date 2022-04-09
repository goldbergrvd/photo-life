import { Dispatch } from "redux";
import { connect } from "react-redux";
import { PhotoListAction, togglePhotoSelect } from "../actions/photoList";
import { StoreState } from "../types";
import PhotoList from "../components/photoList";

function mapStateToProps(state: StoreState) {
  return { photoList: state.photoList }
}

function mapDispatchToProps(dispatch: Dispatch<PhotoListAction>) {
  return {
    onTogglePhotoSelect: (index: number) => dispatch(togglePhotoSelect(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoList)
