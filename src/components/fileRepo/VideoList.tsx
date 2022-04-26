import "./videoList.css";

import React from "react";
import api from "../../api";
import { State, Video, VideoBuffer, VideoList } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompress, faExpand, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import SelectMask from "./SelectMask";
import { ScrollTrigger } from "../../native-dom";

interface Props {
  videoList: VideoList;
  state: State;
  onToggleVideoSelect: (index: number) => void;
  playVideo: (index: number) => void;
  pauseVideo: (index: number) => void;
  openVideoFullscreen: (index: number) => void;
  closeVideoFullscreen: (index: number) => void;
  setVideoTime: (index: number, currentTime: number, duration: number) => void;
  setVideoBuffers: (index: number, buffers: Array<VideoBuffer>) => void;
  fetchVideos: (lastVideoName: string) => void;
}

let scrollTrigger: ScrollTrigger
let isPlaying: boolean

class VideoListComponent extends React.Component<Props, object> {

  videoElements: HTMLVideoElement[] = []

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

  videoBufferLeft(buffer: VideoBuffer, video: Video) {
    return (buffer.start * 100 / video.duration) + '%'
  }

  videoBufferWidth(buffer: VideoBuffer, video: Video) {
    return ((buffer.end - buffer.start) * 100 / video.duration) + '%'
  }

  videoBufferBackground(buffer: VideoBuffer, video: Video) {
    let playedPercentage = (video.currentTime - buffer.start) * 100 / (buffer.end - buffer.start)

    playedPercentage = Math.min(100, playedPercentage)
    if (playedPercentage === 100) {
      return 'rgba(255, 51, 51, 1)'
    }

    playedPercentage = Math.max(0, playedPercentage)
    if (playedPercentage === 0) {
      return 'rgba(255, 255, 255, .8)'
    }

    return `linear-gradient(to right, rgba(255, 51, 51, 1) ${playedPercentage}%, rgba(255, 255, 255, .8) ${playedPercentage}% 100%`
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

  setVideoFullscreen(index: number) {
    const { state, videoList, openVideoFullscreen } = this.props

    if (state === State.Browse) {
      let video = videoList[index]
      if (!video.fullscreen) {
        openVideoFullscreen(index)
      }
    }
  }

  fetchNewVideos() {
    const { videoList, fetchVideos } = this.props

    let lastPhotoName = videoList[videoList.length - 1].name
    fetchVideos(lastPhotoName)
  }

  onVideoUpdate(index: number, video: HTMLVideoElement) {
    this.props.setVideoTime(index, video.currentTime, video.duration)
  }

  onVideoProgress(index: number, video: HTMLVideoElement) {
    let buffers = []
    for (let i = 0; i < video.buffered.length; i++) {
      buffers.push({
        start: video.buffered.start(i),
        end: video.buffered.end(i)
      })
    }
    this.props.setVideoBuffers(index, buffers)
  }

  onVideoContainerClick(index: number) {
    const { state, onToggleVideoSelect } = this.props

    if (state === State.Select) {
      onToggleVideoSelect(index)
    }
  }

  onVideoClick(index: number) {
    const { state, videoList, playVideo, pauseVideo } = this.props

    if (state === State.Browse) {
      let video = videoList[index]
      if (video.play) {
        pauseVideo(index)
      } else {
        playVideo(index)
      }
    }
  }

  onTimeLineTouchDown(index: number) {
    const { videoList, pauseVideo } = this.props
    isPlaying = videoList[index].play
    pauseVideo(index)
    document.ontouchmove = evt => this.setVideoCurrentTime(evt.touches[0].clientX, index)
  }

  onTimeLineTouchUp(index: number) {
    document.ontouchmove = null
    if (isPlaying) {
      this.props.playVideo(index)
    }
  }

  componentDidMount() {
    const { videoList, fetchVideos } = this.props

    if (videoList.length === 0) {
      fetchVideos('')
    }

    scrollTrigger.on(this.fetchNewVideos.bind(this))
    scrollTrigger.scrollToPrevY()
  }

  componentWillUnmount() {
    scrollTrigger.off()
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
      <div className="video-list" ref={c => scrollTrigger = scrollTrigger || new ScrollTrigger(c as HTMLDivElement)}>
        {
          videoList.map((video, i) => (
            <div className={'video' + (video.fullscreen ? ' fullscreen' : '')} key={video.name} onClick={() => this.onVideoContainerClick(i)}>
              <video onTimeUpdate={evt => this.onVideoUpdate(i, evt.target as HTMLVideoElement)}
                     onLoadedMetadata={evt => this.onVideoUpdate(i, evt.target as HTMLVideoElement)}
                     onClick={() => this.onVideoClick(i)}
                     onProgress={(evt) => this.onVideoProgress(i, evt.target as HTMLVideoElement)}
                     ref={v => this.videoElements[i] = v as HTMLVideoElement}>
                <source src={api.video(video.name)} type="video/mp4" />
              </video>
              <div className={'preview-info' + (video.fullscreen ? ' hide' : '')}>
                <div className="expand" onClick={() => this.setVideoFullscreen(i)}><FontAwesomeIcon icon={faExpand} /></div>
                <div className="time">{this.videoCurrentTime(video)}</div>
                <div className="time-line" style={{ width: this.videoProcess(video) }}></div>
              </div>
              <div className={'fullscreen-controls' + (video.fullscreen ? '' : ' hide')}>
                <div className="time-line" onClick={evt => this.setVideoCurrentTime(evt.pageX, i)}>
                  {
                    video.buffers.map((buffer, i) => (
                      <div className="buffer-line" key={i}
                           style={{
                             left: this.videoBufferLeft(buffer, video),
                             width: this.videoBufferWidth(buffer, video),
                             background: this.videoBufferBackground(buffer, video)
                           }}></div>
                    ))
                  }
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
              <SelectMask show={video.selected} />
            </div>
          ))
        }
      </div>
    )
  }
}

export default VideoListComponent;
