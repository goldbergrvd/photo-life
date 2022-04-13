import { Tab } from "../../types";
import Album from "./album";
import ImageRepo from "./imageRepo";
import VideoRepo from "./videoRepo";

interface Props {
  tab: Tab
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

function ViewSwitch({ tab }: Props) {
  return (
    <div className="view-switch">
      { switchView(tab) }
    </div>
  )
}

export default ViewSwitch;
