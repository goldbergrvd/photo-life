import "./videoList.css";

import React from "react";
import api from "../../api";
import { Video, VideoList } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompress, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

interface Props {
  videoList: VideoList;
  playVideo: (index: number) => void;
  pauseVideo: (index: number) => void;
  openVideoFullscreen: (index: number) => void;
  closeVideoFullscreen: (index: number) => void;
  setVideoTime: (index: number, currentTime: number, duration: number) => void;
}

let isPlaying: boolean

class VideoListComponent extends React.Component<Props, object> {

  videoElements: HTMLVideoElement[] = []

  onVideo(index: number, video: HTMLVideoElement) {
    this.props.setVideoTime(index, video.currentTime, video.duration)
  }

  videoTotalTime(video: Video) {
    return this.time(video.duration)
  }

  videoCurrentTime(video: Video) {
    let duration = Math.floor(video.duration - video.currentTime)
    return this.time(duration)
  }

  time(seconds: number) {
    let minute = Math.floor(seconds / 60) + ''
    let second = Math.floor(seconds % 60) + ''

    while (second.length < 2) {
      second = '0' + second
    }
    return minute + ':' + second
  }

  videoProcess(video: Video) {
    return (video.currentTime * 100 / video.duration) + '%'
  }

  videoPointProcess(video: Video) {
    return `calc(${this.videoProcess(video)} - 6px)`
  }

  onVideoClick(index: number) {
    const { videoList, playVideo, pauseVideo, openVideoFullscreen } = this.props
    let video = videoList[index]
    if (!video.fullscreen) {
      if (!video.play) {
        playVideo(index)
      } else {
        openVideoFullscreen(index)
      }
    } else {
      if (!video.play) {
        playVideo(index)
      } else {
        pauseVideo(index)
      }
    }
  }

  onTimeLineTouchDown(index: number) {
    isPlaying = this.props.videoList[index].play
    this.props.pauseVideo(index)
    document.ontouchmove = evt => this.setVideoCurrentTime(evt.touches[0].clientX, index)
  }

  setVideoCurrentTime(xPos: number, index: number) {
    let video = this.videoElements[index]
    let width = window.innerWidth
    if (xPos > width) {
      video.currentTime = video.duration
    } else if (xPos < 0) {
      video.currentTime = 0
    } else {
      video.currentTime = xPos * video.duration / width
    }
  }

  onTimeLineTouchUp(index: number) {
    document.ontouchmove = null
    if (isPlaying) {
      this.props.playVideo(index)
    }
  }

  componentDidUpdate() {
    const { videoList } = this.props
    videoList.forEach((video, i) => {
      let videoEle = this.videoElements[i]
      if (video.play) {
        videoEle.play()
      } else {
        videoEle.pause()
      }
    })
  }

  render() {
    const { videoList, playVideo, pauseVideo, closeVideoFullscreen } = this.props

    return (
      <div className="video-list">
        {
          videoList.map((video, i) => (
            <div className={'video' + (video.fullscreen ? ' fullscreen' : '')} key={i}>
              <video onTimeUpdate={evt => this.onVideo(i, evt.target as HTMLVideoElement)}
                     onLoadedMetadata={evt => this.onVideo(i, evt.target as HTMLVideoElement)}
                     onClick={() => this.onVideoClick(i)}
                     ref={v => this.videoElements[i] = v as HTMLVideoElement}>
                <source src={api.video(video.name)} type="video/mp4" />
              </video>
              <div className={'preview-info' + (video.fullscreen ? ' hide' : '')}>
                <div className="time">{this.videoCurrentTime(video)}</div>
                <div className="time-line" style={{ width: this.videoProcess(video) }}></div>
              </div>
              <div className={'fullscreen-controls' + (video.fullscreen ? '' : ' hide')}>
                <div className="time-line" onClick={evt => this.setVideoCurrentTime(evt.pageX, i)}>
                  <div className="current-line" style={{ width: this.videoProcess(video) }}></div>
                  <div className="current-point" style={{ left: this.videoPointProcess(video) }}
                       onTouchStart={() => this.onTimeLineTouchDown(i)}
                       onTouchEnd={() => this.onTimeLineTouchUp(i)}></div>
                </div>
                <div className="controls">
                  <span className="time">
                    <span className="current">{this.videoCurrentTime(video)}</span>
                    <span className="sep"> / </span>
                    <span className="total">{this.videoTotalTime(video)}</span>
                  </span>
                  <span className="compress"><FontAwesomeIcon icon={faCompress} onClick={() => closeVideoFullscreen(i)} /></span>
                  <span className={'play' + (video.play ? ' hide' : '')} ><FontAwesomeIcon icon={faPlay} onClick={() => playVideo(i)} /></span>
                  <span className={'paulse' + (video.play ? '' : ' hide')} ><FontAwesomeIcon icon={faPause} onClick={() => pauseVideo(i)} /></span>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

export default VideoListComponent;
