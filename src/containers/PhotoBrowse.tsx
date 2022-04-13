import { connect } from "react-redux";
import { Dispatch } from "redux";
import { clearPhotoBrowse, PhotoListAction } from "../actions/photoList";
import PhotoBrowse from "../components/PhotoBrowse";
import { StoreState } from "../types";

function mapStateToProps(state: StoreState) {
  const photo = state.photoList.filter(photo => photo.browsed)[0]
  return {
    photo: photo
  }
}

function mapDispatchToProps(dispatch: Dispatch<PhotoListAction>) {
  return {
    onClose: () => dispatch(clearPhotoBrowse())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoBrowse);
