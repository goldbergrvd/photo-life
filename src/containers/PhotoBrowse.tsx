import { connect } from "react-redux";
import { Dispatch } from "redux";
import { openPhotoBrowseInfo, DisplayAction, togglePhotoBrowseInfo } from "../actions";
import { AlbumListAction, clearAlbumPhotoBrowse, nextAlbumPhotoBrowse, prevAlbumPhotoBrowse } from "../actions/albumList";
import { clearPhotoBrowse, nextPhotoBrowse, PhotoListAction, prevPhotoBrowse } from "../actions/photoList";
import PhotoBrowse from "../components/PhotoBrowse";
import { COLOR_BLACK, COLOR_WHITE } from "../constants";
import { setThemeColor } from "../native-dom";
import { Photo, PhotoList, StoreState, Tab } from "../types";

interface StateProps {
  tab: Tab;
  currPhoto: Photo | null;
  prevPhoto: Photo | null;
  nextPhoto: Photo | null;
  currCount: number;
  totalCount: number;
  showInfo: boolean;
}

interface DispatchProps {
  toggleShowInfo: () => void;
  openShowInfo: () => void;
  onClose: () => void;
  prevPhotoBrowse: () => void;
  nextPhotoBrowse: () => void;
  onAlbumClose: () => void;
  prevAlbumPhotoBrowse: () => void;
  nextAlbumPhotoBrowse: () => void;
}

function mapStateToProps(state: StoreState): StateProps {
  const tab = state.tab
  let photoList: PhotoList = []
  if (tab === Tab.Album) {
    let browsingAlbum = state.albumList.find(a => a.browsing)
    if (browsingAlbum) {
      photoList = browsingAlbum.photoList
    } else {
      photoList = state.photoList
    }
  } else {
    photoList = state.photoList
  }
  const currIndex = photoList.findIndex(p => p.browsed)
  return {
    tab,
    currPhoto: photoList[currIndex] || null,
    prevPhoto: photoList[currIndex - 1] || null,
    nextPhoto: photoList[currIndex + 1] || null,
    currCount: currIndex + 1,
    totalCount: photoList.length,
    showInfo: state.display.photoBrowseInfo
  }
}

function mapDispatchToProps(dispatch: Dispatch<PhotoListAction | DisplayAction | AlbumListAction>): DispatchProps {
  return {
    toggleShowInfo: () => dispatch(togglePhotoBrowseInfo()),
    openShowInfo: () => dispatch(openPhotoBrowseInfo()),
    onClose: () => dispatch(clearPhotoBrowse()),
    prevPhotoBrowse: () => dispatch(prevPhotoBrowse()),
    nextPhotoBrowse: () => dispatch(nextPhotoBrowse()),
    onAlbumClose: () => dispatch(clearAlbumPhotoBrowse()),
    prevAlbumPhotoBrowse: () => dispatch(prevAlbumPhotoBrowse()),
    nextAlbumPhotoBrowse: () => dispatch(nextAlbumPhotoBrowse())
  }
}

function mergeProps(stateProps: StateProps, dispatchProps: DispatchProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    setThemeColor: () => {
      if (stateProps.tab === Tab.Album) {
        setThemeColor(stateProps.currPhoto ? COLOR_BLACK : COLOR_WHITE)
      }
    },
    close: () => {
      if (stateProps.tab === Tab.ImageRepo) {
        dispatchProps.onClose()
      }
      if (stateProps.tab === Tab.Album) {
        dispatchProps.onAlbumClose()
      }
    },
    prev: () => {
      if (stateProps.tab === Tab.ImageRepo) {
        dispatchProps.prevPhotoBrowse()
      }
      if (stateProps.tab === Tab.Album) {
        dispatchProps.prevAlbumPhotoBrowse()
      }
    },
    next: () => {
      if (stateProps.tab === Tab.ImageRepo) {
        dispatchProps.nextPhotoBrowse()
      }
      if (stateProps.tab === Tab.Album) {
        dispatchProps.nextAlbumPhotoBrowse()
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PhotoBrowse);
