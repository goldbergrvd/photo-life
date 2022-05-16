import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setState, StateAction } from "../../actions";
import { AlbumListAction, clearAlbumPhotoSelect, clearBrowseAlbum } from "../../actions/albumList";
import AlbumEditor from "../../components/fileRepo/AlbumEditor";
import { State, StoreState } from "../../types";

function mapStateToProps(state: StoreState) {
  return {
    addText: state.state === State.AddAlbum ? '取消' : '新增',
    deleteText: state.state === State.DeleteAlbum ? '取消' : '刪除',
    selectText: state.state === State.Select ? '取消' : '選取',
    state: state.state,
    isBrowsing: state.albumList.some(album => album.browsing)
  }
}

function mapDispatchToProps(dispatch: Dispatch<AlbumListAction | StateAction>) {
  return {
    setState: (state: State) => dispatch(setState(state)),
    closeBrowsing: () => {
      dispatch(clearAlbumPhotoSelect())
      dispatch(setState(State.Browse))
      dispatch(clearBrowseAlbum())
    },
    clearAlbumPhotoSelect: () => {
      dispatch(clearAlbumPhotoSelect())
      dispatch(setState(State.Browse))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumEditor);

