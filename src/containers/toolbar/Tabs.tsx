import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setTab, TabAction } from "../../actions";
import Tabs from "../../components/toolbar/Tabs";
import { StoreState, Tab } from "../../types";

function mapStateToProps(state: StoreState) {
  return {
    isImageRepoTab: state.tab === Tab.ImageRepo,
    isVideoRepoTab: state.tab === Tab.VideoRepo,
    isAlbumTab: state.tab === Tab.Album
  }
}

function mapDispatchToProps(dispatch: Dispatch<TabAction>) {
  return {
    toImageRepoTab: () => dispatch(setTab(Tab.ImageRepo)),
    toVideoRepoTab: () => dispatch(setTab(Tab.VideoRepo)),
    toAlbumTab: () => dispatch(setTab(Tab.Album))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
