import { VideoAction } from "../actions/videoList";
import { ADD_VIDEOS, CLEAR_VIDEO_SELECT, CLOSE_VIDEO_FULLSCREEN, DELETE_VIDEOS, OPEN_VIDEO_FULLSCREEN, PAUSE_VIDEO, PLAY_VIDEO, SET_VIDEO_TIME, TOGGLE_VIDEO_SELECT, UPDATE_VIDEOS } from "../constants";
import { VideoList } from "../types";

export default function (videoList: VideoList = [], action: VideoAction): VideoList {
  let newVideoList = [...videoList]

  switch (action.type) {
    case ADD_VIDEOS:
      return newVideoList.concat(action.payload)

    case UPDATE_VIDEOS:
      newVideoList = newVideoList.concat(action.payload)
      newVideoList.sort((a, b) => {
        if (a.name > b.name) return -1
        if (a.name < b.name) return 1
        return 0
      })
      return newVideoList

    case DELETE_VIDEOS:
      return newVideoList.filter(video => {
        return !action.payload.get(video.name)
      })

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

    case TOGGLE_VIDEO_SELECT:
      newVideoList[action.payload].selected = !newVideoList[action.payload].selected
      return newVideoList

    case CLEAR_VIDEO_SELECT:
      return newVideoList.map(video => {
        video.selected = false
        return video
      })

    default:
      return videoList
  }
}