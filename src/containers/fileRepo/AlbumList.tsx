import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addErrorMessage, AlertAction, MessagesAction, setAlert } from "../../actions";
import { addAlbum, AlbumListAction, browseAlbum, willDeleteAlbum } from "../../actions/albumList";
import requests from "../../api";
import AlbumList from "../../components/fileRepo/AlbumList";
import { Alert, StoreState, AlbumList as AlbumListType } from "../../types";

function mapStateToProps(state: StoreState) {
  return {
    albumList: state.albumList,
    state: state.state,
    isBrowsing: state.albumList.some(album => album.browsing)
  }
}

function mapDispatchToProps(dispatch: Dispatch<AlbumListAction | AlertAction | MessagesAction>) {
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
            }))
          }))
          dispatch(addAlbum(albumList))
        })
        .catch(err => {
          dispatch(addErrorMessage('讀取相簿時發生異常', err.response.data))
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumList);
