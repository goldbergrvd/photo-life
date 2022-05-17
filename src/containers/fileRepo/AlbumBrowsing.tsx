import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AlbumListAction, openAlbumPhotoBrowse, toggleAlbumPhotoSelect } from "../../actions/albumList";
import AlbumBrowsing from "../../components/fileRepo/AlbumBrowsing";
import { Album, State, StoreState } from "../../types";

interface StateProps {
  album: Album | null;
  state: State;
}

interface DispatchProps {
  toggleAlbumPhotoSelect: (index: number) => void;
  openAlbumPhotoBrowse: (index: number) => void;
}

function mapStateToProps(state: StoreState): StateProps {
  return {
    album: state.albumList.find(album => album.browsing) || null,
    state: state.state
  }
}

function mapDispatchToProps(dispatch: Dispatch<AlbumListAction>): DispatchProps {
  return {
    toggleAlbumPhotoSelect: (index: number) => dispatch(toggleAlbumPhotoSelect(index)),
    openAlbumPhotoBrowse: (index: number) => dispatch(openAlbumPhotoBrowse(index))
  }
}

function mergeProps(stateProps: StateProps, dispatchProps: DispatchProps) {
  return {
    album: stateProps.album,
    onImgClick: (index: number) => {
      switch(stateProps.state) {
        case State.Browse:
          dispatchProps.openAlbumPhotoBrowse(index)
          break
        case State.Select:
          dispatchProps.toggleAlbumPhotoSelect(index)
          break
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AlbumBrowsing);
