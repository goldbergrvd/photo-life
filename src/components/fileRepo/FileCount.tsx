import "./fileCount.css"
import { PhotoList, Tab, VideoList } from "../../types";
import React from "react";

export interface Props {
  photoList: PhotoList;
  videoList: VideoList;
  tab: Tab;
}

class FileCount extends React.Component<Props, object> {

  content() {
    const { photoList, videoList, tab } = this.props
    switch (tab) {
      case Tab.ImageRepo:
        return photoList.length + '張照片'
      case Tab.VideoRepo:
        return videoList.length + '支影片'
      default:
        return ''
    }
  }

  render() {
    return (
      <div className="file-count">{ this.content() }</div>
    )
  }
}

export default FileCount;
