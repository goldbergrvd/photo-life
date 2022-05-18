import { Dispatch } from "redux";
import { connect } from "react-redux";
import { addErrorMessage, addInfoMessage, AlertAction, clearPhotoSelect, MessagesAction, PhotoListAction, setAlert, setState, setUploadProgress, StateAction, UploadProgressAction } from "../../actions";
import { addAlbum, AlbumListAction, browseAlbum, updateAlbum, willDeleteAlbum } from "../../actions/albumList";
import requests from "../../api";
import { Alert, StoreState, State, AlbumList } from "../../types";
import AlbumListComponent from "../../components/listview/AlbumList";

interface StateProps {
  albumList: AlbumList;
  pickedPhotoNames: string[];
  paddingClass: 'no-padding' | '';
  unscrollClass: 'unscroll' | '';
  isDeleteAlbumState: boolean;
  state: State;
}

interface DispatchProps {
  browseAlbum: (id: string) => void;
  willDeleteAlbum: (id: string) => void;
  setAlert: (alert: Alert) => void;
  fetchAlbums: () => void;
  addAlbumPhoto: (id: string, photoNames: string[]) => void;
}

function mapStateToProps(state: StoreState): StateProps {
  return {
    albumList: state.albumList,
    pickedPhotoNames: state.photoList.filter(p => p.selected).map(p => p.name),
    paddingClass: state.state === State.PickAlbum ? 'no-padding' : '',
    unscrollClass: state.albumList.some(album => album.browsing) ? 'unscroll' : '',
    isDeleteAlbumState: state.state === State.DeleteAlbum,
    state: state.state
  }
}

function mapDispatchToProps(dispatch: Dispatch<AlbumListAction | PhotoListAction | AlertAction | StateAction | UploadProgressAction | MessagesAction>): DispatchProps {
  return {
    browseAlbum: (id: string) => dispatch(browseAlbum(id)),
    willDeleteAlbum: (id: string) => dispatch(willDeleteAlbum(id)),
    setAlert: (alert: Alert) => dispatch(setAlert(alert)),
    fetchAlbums: () => {
      requests.albums()
        .then(albumList => dispatch(addAlbum(albumList)))
        .catch(err => {
          dispatch(addErrorMessage('讀取相簿時發生異常', err.response.data))
        })
    },
    addAlbumPhoto: (id: string, photoNames: string[]) => {
      dispatch(setState(State.UpdateAlbum))

      const uploadProgressUpdator = (progress: number) => dispatch(setUploadProgress(progress))
      requests.addAlbumPhoto(id, photoNames, uploadProgressUpdator)
        .then(album => {
          dispatch(updateAlbum(album))
          dispatch(addInfoMessage('添加相簿成功', `已將選取照片加入「${album.name}」`))
        })
        .catch(err => {
          console.log(err)
          dispatch(addErrorMessage('添加相簿失敗', err.response.data))
        })
        .finally(() => {
          setTimeout(() => {
            dispatch(clearPhotoSelect())
            dispatch(setState(State.Browse))
          }, 500)
        })
    }
  }
}

function mergeProps(stateProps: StateProps, dispatchProps: DispatchProps) {
  return {
    ...stateProps,
    fetchAlbums: dispatchProps.fetchAlbums,
    onAlbumClick: (id: string) => {
      switch(stateProps.state) {
        case State.Browse:
          dispatchProps.browseAlbum(id)
          break
        case State.PickAlbum:
          dispatchProps.addAlbumPhoto(id, stateProps.pickedPhotoNames)
          break
      }
    },
    onAlbumDelete: (id: string) => {
      if (stateProps.state === State.DeleteAlbum) {
        dispatchProps.willDeleteAlbum(id)
        dispatchProps.setAlert(Alert.DeleteAlbumCheck)
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AlbumListComponent);
