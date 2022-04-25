import "./fileCount.css"
import { PhotoList, Tab, VideoList } from "../../types";
import React from "react";
import { rootEle } from "../../native-dom";
import { COLOR_BLACK, COLOR_WHITE } from "../../constants";

export interface Props {
  photoList: PhotoList;
  videoList: VideoList;
  tab: Tab;
  color: string;
  setColor: (color: string) => void;
}

const CHANGE_COLOR_BOUNDARY = 32

class FileCount extends React.Component<Props, object> {

  constructor(props: Props) {
    super(props)
    this.onScroll = this.onScroll.bind(this)
  }

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

  onScroll() {
    const { color, setColor } = this.props

    if (rootEle.scrollTop > CHANGE_COLOR_BOUNDARY && color !== COLOR_WHITE) {
      setColor(COLOR_WHITE)
    }
    if (rootEle.scrollTop < CHANGE_COLOR_BOUNDARY && color !== COLOR_BLACK) {
      setColor(COLOR_BLACK)
    }
  }

  componentDidMount() {
    rootEle.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount() {
    rootEle.removeEventListener('scroll', this.onScroll)
  }

  render() {
    const { color } = this.props

    return (
      <div className="file-count" style={{color}}>{ this.content() }</div>
    )
  }
}

export default FileCount;
