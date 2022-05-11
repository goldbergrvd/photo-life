import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AlertAction, setAlert } from "../../actions";
import { AlbumListAction, browseAlbum, willDeleteAlbum } from "../../actions/albumList";
import AlbumList from "../../components/fileRepo/AlbumList";
import { Alert, StoreState } from "../../types";

function mapStateToProps(state: StoreState) {
  return {
    albumList: state.albumList,
    state: state.state,
    isBrowsing: state.albumList.some(album => album.browsing)
  }
}

function mapDispatchToProps(dispatch: Dispatch<AlbumListAction | AlertAction>) {
  return {
    browseAlbum: (id: number) => dispatch(browseAlbum(id)),
    willDeleteAlbum: (id: number) => dispatch(willDeleteAlbum(id)),
    setAlert: (alert: Alert) => dispatch(setAlert(alert))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumList);
