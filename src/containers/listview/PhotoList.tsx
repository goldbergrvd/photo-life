import { Dispatch } from "redux";
import { connect } from "react-redux";
import { addErrorMessage, MessagesAction } from "../../actions";
import { addPhotos, openPhotoBrowse, PhotoListAction, togglePhotoSelect } from "../../actions/photoList";
import requests from "../../api";
import { StoreState, Tab } from "../../types";
import PhotoList from "../../components/listview/PhotoList";

let isFetching = false

function mapStateToProps(state: StoreState) {
  return {
    photoList: state.photoList,
    state: state.state,
    viewType: state.viewType,
    paddingClass: state.tab === Tab.Album ? 'no-padding' : ''
  }
}

function mapDispatchToProps(dispatch: Dispatch<PhotoListAction | MessagesAction>) {
  return {
    onTogglePhotoSelect: (index: number) => dispatch(togglePhotoSelect(index)),
    onOpenPhotoBrowse: (index: number) => dispatch(openPhotoBrowse(index)),
    fetchPhotos: (lastPhotoName: string, amount: number) => {
      if (isFetching) {
        return
      }
      isFetching = true
      requests.images(lastPhotoName, amount)
        .then(photoNames => dispatch(addPhotos(photoNames)))
        .catch(err => {
          console.log(err)
          dispatch(addErrorMessage('讀取照片時發生異常', err.response.data))
        })
        .finally(() => {
          isFetching = false
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoList)
