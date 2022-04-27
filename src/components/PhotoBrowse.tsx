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
const FONT_SIZE = () => parseFloat(getComputedStyle(document.documentElement).fontSize)
const PREV_PHOTO_LEFT = () => -window.innerWidth * 0 - FONT_SIZE() * 1
const CURR_PHOTO_LEFT = () => -window.innerWidth * 1 - FONT_SIZE() * 3
const NEXT_PHOTO_LEFT = () => -window.innerWidth * 2 - FONT_SIZE() * 5
const TRANSITION_LEFT = 'left .1s ease'
const TRANSITION_TOP = 'top .1s ease'
const REVERT_POSITION_TIME = 100


function PhotoBrowse({ photoList, onClose, prevPhotoBrowse, nextPhotoBrowse }: Props) {

  const photoIndex = photoList.findIndex(photo => photo.browsed)
  const hasBrowsed = photoIndex >= 0
  const isFirst = photoIndex === 0
  const isLast = photoIndex === photoList.length - 1

  const swipeHandlers = useSwipeable({
    onSwiping: (evt) => {
      switch (evt.dir) {
        case LEFT:
        case RIGHT:
          _slider.style.left = CURR_PHOTO_LEFT() + evt.deltaX + 'px'
          break
        case UP:
        case DOWN:
          _slider.style.top = evt.deltaY + 'px'
          break
      }
    },
    onSwiped: (evt) => {
      if (evt.velocity < 0.4) {
        if (evt.dir === LEFT || evt.dir === RIGHT) {
          if (evt.absX < window.innerWidth / 4) {
            revertSlider('left')
            return
          }
        }
        if (evt.dir === UP || evt.dir === DOWN) {
          if (evt.absY < window.innerHeight / 5) {
            revertSlider('top')
            return
          }
        }
      }

      if (evt.dir === LEFT && isLast || evt.dir === RIGHT && isFirst) {
        revertSlider('left')
        return
      }

      if (evt.dir === LEFT) {
        slide('left', NEXT_PHOTO_LEFT(), nextPhotoBrowse)
      }
      if (evt.dir === RIGHT) {
        slide('left', PREV_PHOTO_LEFT(), prevPhotoBrowse)
      }
      if (evt.dir === UP) {
        slide('top', -window.innerHeight, onClose)
      }
      if (evt.dir === DOWN) {
        slide('top', window.innerHeight, onClose)
      }
    }
  })

  function slide(dir: 'left' | 'top', val: number, callback: () => void) {
    _slider.style.transition = (dir === 'left' ? TRANSITION_LEFT : TRANSITION_TOP)
    _slider.style[dir] = val + 'px'
    setTimeout(() => {
      callback()
      _slider.style.transition = ''
      _slider.style[dir] = ''
    }, REVERT_POSITION_TIME)
  }

  function revertSlider(dir: 'left' | 'top') {
    _slider.style.transition = (dir === 'left' ? TRANSITION_LEFT : TRANSITION_TOP)
    _slider.style[dir] = ''
    setTimeout(() => {
      _slider.style.transition = ''
    }, REVERT_POSITION_TIME)
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
        {hasBrowsed ? <img className="curr-img" src={api.image(photoList[photoIndex].name)} crossOrigin="anonymous" /> : ''}
        {hasBrowsed && !isLast ? <img className="next-img" src={api.image(photoList[photoIndex + 1].name)} crossOrigin="anonymous" /> : ''}
      </div>
      <div className="index">{photoIndex + 1 + '/' + photoList.length}</div>
      {photoList[photoIndex] ? <div className="file-name">{fileName()}</div> :  ''}
      <FontAwesomeIcon className="close" icon={faXmark} size="2x" onClick={onClose} />
    </div>
  )
}

export default PhotoBrowse;