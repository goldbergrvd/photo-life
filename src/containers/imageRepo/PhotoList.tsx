import { Dispatch } from "redux";
import { connect } from "react-redux";
import { addPhotos, openPhotoBrowse, PhotoListAction, togglePhotoSelect } from "../../actions/photoList";
import { StoreState } from "../../types";
import PhotoList from "../../components/imageRepo/PhotoList";
import axios from "axios";
import api from "../../api";

function mapStateToProps(state: StoreState) {
  return {
    photoList: state.photoList,
    state: state.state
  }
}

function mapDispatchToProps(dispatch: Dispatch<PhotoListAction>) {
  return {
    onTogglePhotoSelect: (index: number) => dispatch(togglePhotoSelect(index)),
    onOpenPhotoBrowse: (index: number) => dispatch(openPhotoBrowse(index)),
    fetchPhotos: () => {
      axios.get(api.images)
           .then(res => {
             dispatch(addPhotos(res.data))
           })
           .catch(err => {
             console.log(err)
           })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoList)
