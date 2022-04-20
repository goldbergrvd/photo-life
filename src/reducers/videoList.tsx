import { VideoAction } from "../actions/videoList";
import { CLOSE_VIDEO_FULLSCREEN, OPEN_VIDEO_FULLSCREEN, PAUSE_VIDEO, PLAY_VIDEO, SET_VIDEO_TIME } from "../constants";
import { VideoList } from "../types";

export default function (videoList: VideoList = [], action: VideoAction): VideoList {
  const newVideoList = [...videoList]

  switch (action.type) {
    case PLAY_VIDEO:
      newVideoList.forEach(video => {
        video.play = false
      })
      newVideoList[action.payload].play = true
      return newVideoList

    case PAUSE_VIDEO:
      newVideoList[action.payload].play = false
      return newVideoList

    case OPEN_VIDEO_FULLSCREEN:
      newVideoList[action.payload].play = true
      newVideoList[action.payload].fullscreen = true
      return newVideoList

    case CLOSE_VIDEO_FULLSCREEN:
      newVideoList[action.payload].play = false
      newVideoList[action.payload].fullscreen = false
      return newVideoList

    case SET_VIDEO_TIME:
      newVideoList[action.payload.index].currentTime = action.payload.currentTime
      newVideoList[action.payload.index].duration = action.payload.duration
      return newVideoList

    default:
      return videoList
  }
}