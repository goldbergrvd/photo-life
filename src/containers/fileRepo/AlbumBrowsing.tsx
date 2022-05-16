import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AlbumListAction, toggleAlbumPhotoSelect } from "../../actions/albumList";
import AlbumBrowsing from "../../components/fileRepo/AlbumBrowsing";
import { StoreState } from "../../types";

function mapStateToProps(state: StoreState) {
  return {
    album: state.albumList.find(album => album.browsing) || null,
    state: state.state
  }
}

function mapDispatchToProps(dispatch: Dispatch<AlbumListAction>) {
  return {
    toggleAlbumPhotoSelect: (index: number) => dispatch(toggleAlbumPhotoSelect(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumBrowsing);
