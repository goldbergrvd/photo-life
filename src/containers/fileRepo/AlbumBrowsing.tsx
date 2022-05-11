import { connect } from "react-redux";
import AlbumBrowsing from "../../components/fileRepo/AlbumBrowsing";
import { StoreState } from "../../types";

function mapStateToProps(state: StoreState) {
  return {
    album: state.albumList.find(album => album.browsing) || null
  }
}

export default connect(mapStateToProps)(AlbumBrowsing);
