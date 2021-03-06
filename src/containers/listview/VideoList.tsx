import { Dispatch } from "redux";
import { connect } from "react-redux";
import { addErrorMessage, closeVideoControls, DisplayAction, MessagesAction, openVideoControls } from "../../actions";
import { addVideos, closeVideoFullscreen, openVideoFullscreen, pauseVideo, playVideo, setVideoBuffers, setVideoTime, toggleVideoSelect, VideoAction } from "../../actions/videoList";
import requests from "../../api";
import { StoreState, VideoBuffer } from "../../types";
import VideoListComponent from "../../components/listview/VideoList";

function mapStateToProps(state: StoreState) {
  return {
    videoList: state.videoList,
    state: state.state,
    showVideoControls: state.display.videoControls
  }
}

function mapDispatchToProps(dispatch: Dispatch<VideoAction | MessagesAction | DisplayAction>) {
  return {
    onToggleVideoSelect: (index: number) => dispatch(toggleVideoSelect(index)),
    playVideo: (index: number) => dispatch(playVideo(index)),
    pauseVideo: (index: number) => dispatch(pauseVideo(index)),
    openVideoFullscreen: (index: number) => dispatch(openVideoFullscreen(index)),
    closeVideoFullscreen: (index: number) => dispatch(closeVideoFullscreen(index)),
    openVideoControls: () => dispatch(openVideoControls()),
    closeVideoControls: () => dispatch(closeVideoControls()),
    setVideoTime: (index: number, currentTime: number, duration: number) => dispatch(setVideoTime(index, currentTime, duration)),
    setVideoBuffers: (index: number, buffers: Array<VideoBuffer>) => dispatch(setVideoBuffers(index, buffers)),
    fetchVideos: (lastVideoName: string) => {
      requests.videos(lastVideoName)
        .then(videoNames => dispatch(addVideos(videoNames)))
        .catch(err => {
          console.log(err)
          dispatch(addErrorMessage('讀取影片時發生異常', err.response.data))
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoListComponent);
