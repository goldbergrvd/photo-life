import { connect } from "react-redux";
import { Dispatch } from "redux";
import { closeVideoFullscreen, openVideoFullscreen, pauseVideo, playVideo, setVideoTime, VideoAction } from "../../actions/videoList";
import VideoListComponent from "../../components/fileRepo/VideoList";
import { StoreState } from "../../types";

function mapStateToProps(state: StoreState) {
  return {
    videoList: state.videoList
  }
}

function mapDispatchToProps(dispatch: Dispatch<VideoAction>) {
  return {
    playVideo: (index: number) => dispatch(playVideo(index)),
    pauseVideo: (index: number) => dispatch(pauseVideo(index)),
    openVideoFullscreen: (index: number) => dispatch(openVideoFullscreen(index)),
    closeVideoFullscreen: (index: number) => dispatch(closeVideoFullscreen(index)),
    setVideoTime: (index: number, currentTime: number, duration: number) => dispatch(setVideoTime(index, currentTime, duration))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoListComponent);
