import "./photoBrowse.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PhotoList } from "../types";
import { DOWN, LEFT, RIGHT, UP, useSwipeable } from "react-swipeable";
import api from "../api";

export interface Props {
  photoList: PhotoList;
  onClose: () => void;
  prevPhotoBrowse: () => void;
  nextPhotoBrowse: () => void;
}

let _slider: HTMLDivElement
let _currImg: HTMLImageElement
let swipeDir: 'vertical' | 'horizontal' | null = null

const FONT_SIZE = () => parseFloat(getComputedStyle(document.documentElement).fontSize)
const PREV_PHOTO_SLIDER_LEFT = () => -window.innerWidth * 0 - FONT_SIZE() * 1
const CURR_PHOTO_SLIDER_LEFT = () => -window.innerWidth * 1 - FONT_SIZE() * 3
const NEXT_PHOTO_SLIDER_LEFT = () => -window.innerWidth * 2 - FONT_SIZE() * 5
const CURR_IMAGE_WIDTH = (delta: number) => window.innerWidth * (0.7 + 0.3 * (window.innerWidth - delta) / window.innerWidth)
const CURR_IMAGE_LEFT = (delta: number) => window.innerWidth + FONT_SIZE() * 3 + (window.innerWidth - CURR_IMAGE_WIDTH(delta)) / 2
const TRANSITION_LEFT = 'left .1s ease'
const TRANSITION_TOP = 'top .1s ease'
const TRANSITION_TIME = 100


function PhotoBrowse({ photoList, onClose, prevPhotoBrowse, nextPhotoBrowse }: Props) {

  const photoIndex = photoList.findIndex(photo => photo.browsed)
  const hasBrowsed = photoIndex >= 0
  const isFirst = photoIndex === 0
  const isLast = photoIndex === photoList.length - 1

  const swipeHandlers = useSwipeable({
    onSwipeStart: (evt) => {
      switch (evt.dir) {
        case LEFT:
        case RIGHT:
          swipeDir = 'horizontal'
          break
        case UP:
        case DOWN:
          swipeDir = 'vertical'
          break
      }
    },
    onSwiping: (evt) => {
      switch (swipeDir) {
        case 'horizontal':
          _slider.style.left = CURR_PHOTO_SLIDER_LEFT() + evt.deltaX + 'px'
          _currImg.style.width = CURR_IMAGE_WIDTH(evt.absX) + 'px'
          _currImg.style.left = CURR_IMAGE_LEFT(evt.absX) + 'px'
          break
        case 'vertical':
          _currImg.style.top = evt.deltaY + 'px'
          _currImg.style.width = CURR_IMAGE_WIDTH(evt.absY) + 'px'
          _currImg.style.left = CURR_IMAGE_LEFT(evt.absY) + 'px'
          break
      }
    },
    onSwiped: (evt) => {
      if (evt.velocity < 0.4) {
        if (swipeDir === 'horizontal') {
          if (evt.absX < window.innerWidth / 4) {
            revertSlider()
            return
          }
        }
        if (swipeDir === 'vertical') {
          if (evt.absY < window.innerHeight / 5) {
            revertSlider()
            return
          }
        }
      }

      if (swipeDir === 'horizontal') {
        if (evt.dir === LEFT && isLast || evt.dir === RIGHT && isFirst) {
          revertSlider()
          return
        }

        if (evt.dir === LEFT) {
          slideHorizontal(NEXT_PHOTO_SLIDER_LEFT(), nextPhotoBrowse)
          return
        }
        if (evt.dir === RIGHT) {
          slideHorizontal(PREV_PHOTO_SLIDER_LEFT(), prevPhotoBrowse)
          return
        }
        revertSlider()
      }

      if (swipeDir === 'vertical') {
        if (evt.dir === UP) {
          slideVertical(-window.innerHeight)
          return
        }
        if (evt.dir === DOWN) {
          slideVertical(window.innerHeight)
          return
        }
        revertSlider()
      }
    }
  })

  function slideHorizontal(val: number, callback: () => void) {
    _slider.style.transition = TRANSITION_LEFT
    _slider.style.left = val + 'px'
    swipeDir = null
    setTimeout(() => {
      callback()
      _slider.style.transition = ''
      _slider.style.left = ''
      _currImg.style.width = ''
      _currImg.style.left = ''
    }, TRANSITION_TIME)
  }

  function slideVertical(val: number) {
    _currImg.style.transition = TRANSITION_TOP
    _currImg.style.top = val + 'px'
    swipeDir = null
    setTimeout(() => {
      onClose()
    }, TRANSITION_TIME)
  }

  function revertSlider() {
    if (swipeDir === 'horizontal') {
      _slider.style.transition = TRANSITION_LEFT
      _slider.style.left = ''
    }
    if (swipeDir === 'vertical') {
      _currImg.style.transition = TRANSITION_TOP
      _currImg.style.top = ''
    }
    _currImg.style.width = ''
    _currImg.style.left = ''
    swipeDir = null
    setTimeout(() => {
      _slider.style.transition = ''
      _currImg.style.transition = ''
    }, TRANSITION_TIME)
  }

  function fileName() {
    if (photoIndex < 0) {
      return ''
    }
    let photoName = photoList[photoIndex].name

    return photoName.substring(0, 4) + '/' +
           photoName.substring(4, 6) + '/' +
           photoName.substring(6, 8) + ' ' +
           photoName.substring(8, 10) + ':' +
           photoName.substring(10, 12) + ':' +
           photoName.substring(12, 14)
  }

  return (
    <div className={'photo' + (photoIndex !== -1 ? '' : ' hide')} {...swipeHandlers}>
      <div className="slider" ref={c => _slider = c as HTMLDivElement}>
        {hasBrowsed && !isFirst ? <img className="prev-img" src={api.image(photoList[photoIndex - 1].name)} crossOrigin="anonymous" /> : ''}
        {hasBrowsed ? <img className="curr-img" src={api.image(photoList[photoIndex].name)} crossOrigin="anonymous" ref={c => _currImg = c as HTMLImageElement} /> : ''}
        {hasBrowsed && !isLast ? <img className="next-img" src={api.image(photoList[photoIndex + 1].name)} crossOrigin="anonymous" /> : ''}
      </div>
      <div className="index">{photoIndex + 1 + '/' + photoList.length}</div>
      {photoList[photoIndex] ? <div className="file-name">{fileName()}</div> :  ''}
      <FontAwesomeIcon className="close" icon={faXmark} size="2x" onClick={onClose} />
    </div>
  )
}

export default PhotoBrowse;