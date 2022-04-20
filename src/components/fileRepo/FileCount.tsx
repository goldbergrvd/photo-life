import "./fileCount.css"
import { PhotoList, Tab, VideoList } from "../../types";

export interface Props {
  photoList: PhotoList;
  videoList: VideoList;
  tab: Tab;
}

function FileCount ({ photoList, videoList, tab }: Props) {

  function content() {
    switch (tab) {
      case Tab.ImageRepo:
        return photoList.length + '張照片'
      case Tab.VideoRepo:
        return videoList.length + '支影片'
      default:
        return ''
    }
  }

  return (
    <div className="file-count">{ content() }</div>
  )
}

export default FileCount;