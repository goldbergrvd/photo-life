import { Dispatch } from "redux";
import { connect } from "react-redux";
import { AlbumListAction, openAlbumPhotoBrowse, toggleAlbumPhotoSelect } from "../../actions/albumList";
import { Album, State, StoreState } from "../../types";
import AlbumBrowsing from "../../components/listview/AlbumBrowsing";
import { setState, StateAction } from "../../actions";

interface StateProps {
  album: Album | null;
  state: State;
}

interface DispatchProps {
  toPickPhotoState: () => void;
  toggleAlbumPhotoSelect: (index: number) => void;
  openAlbumPhotoBrowse: (index: number) => void;
}

function mapStateToProps(state: StoreState): StateProps {
  return {
    album: state.albumList.find(album => album.browsing) || null,
    state: state.state
  }
}

function mapDispatchToProps(dispatch: Dispatch<AlbumListAction | StateAction>): DispatchProps {
  return {
    toPickPhotoState: () => dispatch(setState(State.PickPhoto)),
    toggleAlbumPhotoSelect: (index: number) => dispatch(toggleAlbumPhotoSelect(index)),
    openAlbumPhotoBrowse: (index: number) => dispatch(openAlbumPhotoBrowse(index))
  }
}

function mergeProps(stateProps: StateProps, dispatchProps: DispatchProps) {
  return {
    album: stateProps.album,
    onAddPhotoClick: () => dispatchProps.toPickPhotoState(),
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
