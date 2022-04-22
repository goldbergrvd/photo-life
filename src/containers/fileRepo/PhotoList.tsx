import { Dispatch } from "redux";
import { connect } from "react-redux";
import { addPhotos, openPhotoBrowse, PhotoListAction, togglePhotoSelect } from "../../actions/photoList";
import { StoreState } from "../../types";
import PhotoList from "../../components/fileRepo/PhotoList";
import axios from "axios";
import api from "../../api";

let isFetching = false

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
    fetchPhotos: (lastPhotoName: string) => {
      if (isFetching) {
        return
      }
      isFetching = true
      axios.get(api.images(lastPhotoName))
           .then(res => {
             dispatch(addPhotos(res.data))
           })
           .catch(err => {
             console.log(err)
           })
           .finally(() => {
             isFetching = false
           })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoList)
