import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setState, StateAction } from "../../actions";
import { AlbumListAction, clearBrowseAlbum } from "../../actions/albumList";
import AlbumEditor from "../../components/fileRepo/AlbumEditor";
import { State, StoreState } from "../../types";

function mapStateToProps(state: StoreState) {
  return {
    state: state.state,
    isBrowsing: state.albumList.some(album => album.browsing)
  }
}

function mapDispatchToProps(dispatch: Dispatch<AlbumListAction | StateAction>) {
  return {
    setState: (state: State) => dispatch(setState(state)),
    closeBrowsing: () => dispatch(clearBrowseAlbum())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumEditor);

