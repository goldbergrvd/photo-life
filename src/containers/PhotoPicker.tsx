import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addErrorMessage, addInfoMessage, clearPhotoSelect, MessagesAction, PhotoListAction, setState, setUploadProgress, StateAction, UploadProgressAction } from "../actions";
import { AlbumListAction, updateAlbum } from "../actions/albumList";
import requests from "../api";
import PhotoPicker from "../components/PhotoPicker";
import { Album, PhotoList, State, StoreState, Tab } from "../types";

interface StateProps {
  photoList: PhotoList;
  browsingAlbum: Album | null;
  show: boolean;
  submiting: boolean;
}

interface DispatchProps {
  cancel: () => void;
  toUpdateAlbumState: () => void;
  setUploadProgress: (v: number) => void;
  updateAlbum: (album: Album) => void;
  addInfoMessage: (title: string, content: string) => void;
  addErrorMessage: (title: string, content: string) => void;
}

function mapStateToProps(state: StoreState): StateProps {
  return {
    photoList: state.photoList,
    browsingAlbum: state.albumList.find(a => a.browsing) || null,
    show: [State.PickPhoto, State.UpdateAlbum].includes(state.state) && state.tab === Tab.Album,
    submiting: state.state === State.UpdateAlbum
  }
}

function mapDispatchToProps(dispatch: Dispatch<StateAction | PhotoListAction | AlbumListAction | UploadProgressAction | MessagesAction>): DispatchProps {
  return {
    cancel: () => {
      dispatch(setState(State.Browse))
      dispatch(clearPhotoSelect())
    },
    toUpdateAlbumState: () => dispatch(setState(State.UpdateAlbum)),
    setUploadProgress: (v: number) => dispatch(setUploadProgress(v)),
    updateAlbum: (album: Album) => dispatch(updateAlbum(album)),
    addInfoMessage: (title: string, content: string) => dispatch(addInfoMessage(title, content)),
    addErrorMessage: (title: string, content: string) => dispatch(addErrorMessage(title, content))
  }
}

function mergeProps(stateProps: StateProps, dispatchProps: DispatchProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    submit: () => {
      dispatchProps.toUpdateAlbumState()

      let albumId = stateProps.browsingAlbum!.id
      let photoNames = stateProps.photoList.filter(p => p.selected).map(p => p.name)

      requests.addAlbumPhoto(albumId, photoNames, dispatchProps.setUploadProgress)
        .then(album => {
          dispatchProps.updateAlbum(album)
          dispatchProps.addInfoMessage('添加相片成功', `成功添加了${photoNames.length}張相片至「${album.name}」`)
        })
        .catch(err => {
          dispatchProps.addErrorMessage('添加相片失敗', err.response.data)
        })
        .finally(() => {
          setTimeout(dispatchProps.cancel, 500)
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PhotoPicker);
