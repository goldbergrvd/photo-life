import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setState, StateAction } from "../../actions";
import { AlbumListAction, clearAlbumPhotoSelect, clearBrowseAlbum } from "../../actions/albumList";
import AlbumEditor from "../../components/header/AlbumEditor";
import { State, StoreState } from "../../types";

interface StateProps {
  addText: string;
  deleteText: string;
  selectText: string;
  state: State;
  isBrowsing: boolean;
}

interface DispatchProps {
  setState: (state: State) => void;
  closeBrowsing: () => void;
  clearAlbumPhotoSelect: () => void;
}

function mapStateToProps(state: StoreState): StateProps {
  return {
    addText: state.state === State.AddAlbum ? '取消' : '新增',
    deleteText: state.state === State.DeleteAlbum ? '取消' : '刪除',
    selectText: state.state === State.Select ? '取消' : '選取',
    state: state.state,
    isBrowsing: state.albumList.some(album => album.browsing)
  }
}

function mapDispatchToProps(dispatch: Dispatch<AlbumListAction | StateAction>): DispatchProps {
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

function mergeProps(stateProps: StateProps, dispatchProps: DispatchProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    onAddClick: () => {
      if (stateProps.state === State.AddAlbum) {
        dispatchProps.setState(State.Browse)
      } else {
        dispatchProps.setState(State.AddAlbum)
      }
    },
    onDeleteClick: () => {
      if (stateProps.state === State.DeleteAlbum) {
        dispatchProps.setState(State.Browse)
      } else {
        dispatchProps.setState(State.DeleteAlbum)
      }
    },
    onSelectClick: () => {
      if (stateProps.state === State.Select) {
        dispatchProps.clearAlbumPhotoSelect()
      } else {
        dispatchProps.setState(State.Select)
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AlbumEditor);

