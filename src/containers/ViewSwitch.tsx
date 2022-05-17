import { connect } from "react-redux";
import { StoreState, Tab } from "../types";

import ViewSwitch from "../components/view/ViewSwitch";
import ImageRepo from "../components/view/ImageRepo";
import VideoRepo from "../components/view/VideoRepo";
import Album from "../components/view/Album";

function mapStateToProps(state: StoreState) {
  switch(state.tab) {
    case Tab.ImageRepo:
      return { component: <ImageRepo /> }
    case Tab.VideoRepo:
      return { component: <VideoRepo /> }
    case Tab.Album:
      return { component: <Album /> }
  }
}

export default connect(mapStateToProps)(ViewSwitch);
