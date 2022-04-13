import "./viewSwitch.css";

import { State, Tab } from "../../types";
import Album from "./Album";
import ImageRepo from "./ImageRepo";
import VideoRepo from "./VideoRepo";

interface Props {
  tab: Tab;
  browsed: boolean
}

function switchView(tab: Tab) {
  switch(tab) {
    case Tab.ImageRepo:
      return <ImageRepo />
    case Tab.VideoRepo:
      return <VideoRepo />
    case Tab.Album:
      return <Album />
  }
}

function ViewSwitch({ tab, browsed }: Props) {
  return (
    <div className={'view-switch' + (browsed ? ' unscroll' : '')}>
      { switchView(tab) }
    </div>
  )
}

export default ViewSwitch;
