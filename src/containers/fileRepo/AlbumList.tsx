import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addErrorMessage, addInfoMessage, AlertAction, clearPhotoSelect, MessagesAction, PhotoListAction, setAlert, setState, StateAction } from "../../actions";
import { addAlbum, AlbumListAction, browseAlbum, updateAlbum, willDeleteAlbum } from "../../actions/albumList";
import requests from "../../api";
import AlbumList from "../../components/fileRepo/AlbumList";
import { Alert, StoreState, AlbumList as AlbumListType, State, Album } from "../../types";

function mapStateToProps(state: StoreState) {
  return {
    albumList: state.albumList,
    pickedPhotoNames: state.photoList.filter(p => p.selected).map(p => p.name),
    state: state.state,
    isBrowsing: state.albumList.some(album => album.browsing)
  }
}

function mapDispatchToProps(dispatch: Dispatch<AlbumListAction | PhotoListAction | AlertAction | StateAction | MessagesAction>) {
  return {
    browseAlbum: (id: string) => dispatch(browseAlbum(id)),
    willDeleteAlbum: (id: string) => dispatch(willDeleteAlbum(id)),
    setAlert: (alert: Alert) => dispatch(setAlert(alert)),
    fetchAlbums: () => {
      requests.albums()
        .then(res => {
          let albumList: AlbumListType = res.data.map((d: any) => ({
            id: d.id,
            name: d.name,
            photoList: d.photoList.map((photoName: string) => ({
              name: photoName,
              browsed: false,
              selected: false
            })),
            browsing: false,
            willDelete: false
          }))
          dispatch(addAlbum(albumList))
        })
        .catch(err => {
          dispatch(addErrorMessage('讀取相簿時發生異常', err.response.data))
        })
    },
    addAlbumPhoto: (id: string, photoNames: string[]) => {
      requests.addAlbumPhoto(id, photoNames)
        .then(res => {
          let album: Album = {
            id: res.data.id,
            name: res.data.name,
            photoList: res.data.photoList.map((photoName: string) => ({
              name: photoName,
              borwsed: false,
              selected: false
            })),
            browsing: false,
            willDelete: false
          }
          dispatch(updateAlbum(album))
          dispatch(addInfoMessage('添加相簿成功', `已將選取照片加入「${album.name}」`))
        })
        .catch(err => {
          console.log(err)
          dispatch(addErrorMessage('添加相簿失敗', err.response.data))
        })
        .finally(() => {
          dispatch(clearPhotoSelect())
          dispatch(setState(State.Browse))
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumList);
