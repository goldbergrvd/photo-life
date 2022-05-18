import "./photoBrowse.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Photo } from "../types";
import { DOWN, LEFT, RIGHT, UP, useSwipeable } from "react-swipeable";
import PhotoLoader from "./PhotoLoader";

export interface Props {
  currPhoto: Photo | null;
  prevPhoto: Photo | null;
  nextPhoto: Photo | null;
  currCount: number;
  totalCount: number;
  showInfo: boolean;
  toggleShowInfo: () => void;
  openShowInfo: () => void;
  setThemeColor: () => void;
  close: () => void;
  prev: () => void;
  next: () => void;
}

let _slider: HTMLDivElement
let _currImg: HTMLDivElement
let _prevImg: HTMLDivElement
let _nextImg: HTMLDivElement
let swipeDir: 'vertical' | 'horizontal' | null = null
let transitioning = false

const FONT_SIZE = () => parseFloat(getComputedStyle(document.documentElement).fontSize)
const TRANSITION_SECOND = .5
const SHRINK_WIDTH_RATIO = 0.7
const SHRINK_GAP_RATIO = 1 - SHRINK_WIDTH_RATIO
const CLOSE_WIDTH_RATIO = 0.2
const CLOSE_GAP_RATIO = 1 - CLOSE_WIDTH_RATIO

const BASE_PREV_LEFT = () => window.innerWidth * 0 + FONT_SIZE() * 1
const BASE_CURR_LEFT = () => window.innerWidth * 1 + FONT_SIZE() * 3
const BASE_NEXT_LEFT = () => window.innerWidth * 2 + FONT_SIZE() * 5

const PREV_PHOTO_SLIDER_LEFT = () => -BASE_PREV_LEFT()
const CURR_PHOTO_SLIDER_LEFT = () => -BASE_CURR_LEFT()
const NEXT_PHOTO_SLIDER_LEFT = () => -BASE_NEXT_LEFT()

const CURR_IMG_SLIDING_WIDTH = (delta: number) => window.innerWidth * SHRINK_WIDTH_RATIO + SHRINK_GAP_RATIO * (window.innerWidth - delta)
const SIBLING_IMG_SLIDING_WIDTH = (delta: number) => window.innerWidth * SHRINK_WIDTH_RATIO + SHRINK_GAP_RATIO * delta
const PREV_IMG_SLIDING_LEFT = (delta: number) => BASE_PREV_LEFT() + SHRINK_GAP_RATIO / 2 * delta
const CURR_IMG_SLIDING_LEFT = (delta: number) => BASE_CURR_LEFT() + SHRINK_GAP_RATIO / 2 * delta
const NEXT_IMG_SLIDING_LEFT = (delta: number) => BASE_NEXT_LEFT() + SHRINK_GAP_RATIO / 2 * delta

const CURR_IMG_SLIDE_WIDTH = () => window.innerWidth * SHRINK_WIDTH_RATIO
const CURR_IMG_SLIDE_LEFT = () => BASE_CURR_LEFT() + window.innerWidth * SHRINK_GAP_RATIO / 2
const CURR_IMG_CLOSE_WIDTH = () => window.innerWidth * CLOSE_WIDTH_RATIO
const CURR_IMG_CLOSE_LEFT = () => BASE_CURR_LEFT() + window.innerWidth * CLOSE_GAP_RATIO / 2

const SIBLING_IMG_SLIDE_WIDTH = () => window.innerWidth
const PREV_IMG_SLIDE_LEFT = () => BASE_PREV_LEFT()
const NEXT_IMG_SLIDE_LEFT = () => BASE_NEXT_LEFT()

function PhotoBrowse({ currPhoto, prevPhoto, nextPhoto, currCount, totalCount, showInfo, setThemeColor, toggleShowInfo, openShowInfo, close, prev, next }: Props) {
  setThemeColor()

  const hasBrowsed = currPhoto !== null
  const isFirst = prevPhoto === null
  const isLast = nextPhoto === null

  if (!hasBrowsed) {
    openShowInfo()
  }

  const swipeHandlers = useSwipeable({
    onSwipeStart: (evt) => {
      if (transitioning) return
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

          _currImg.style.width = CURR_IMG_SLIDING_WIDTH(evt.absX) + 'px'
          _currImg.style.left = CURR_IMG_SLIDING_LEFT(evt.absX) + 'px'

          if (_prevImg) {
            _prevImg.style.width = SIBLING_IMG_SLIDING_WIDTH(evt.absX) + 'px'
            _prevImg.style.left = PREV_IMG_SLIDING_LEFT(evt.absX) + 'px'
          }

          if (_nextImg) {
            _nextImg.style.width = SIBLING_IMG_SLIDING_WIDTH(evt.absX) + 'px'
            _nextImg.style.left = NEXT_IMG_SLIDING_LEFT(evt.absX) + 'px'
          }
          break

        case 'vertical':
          _currImg.style.top = evt.deltaY + 'px'
          _currImg.style.width = CURR_IMG_SLIDING_WIDTH(evt.absY) + 'px'
          _currImg.style.left = CURR_IMG_SLIDING_LEFT(evt.absY) + 'px'
          break
      }
    },
    onSwiped: (evt) => {
      let restXPercentage = (window.innerWidth - evt.absX) / window.innerWidth
      let restYPercentage = (window.innerHeight - evt.absY) / window.innerHeight

      if (evt.velocity < 0.4) {
        if (swipeDir === 'horizontal') {
          if (restXPercentage > .6) {
            revertSlider(restXPercentage)
            return
          }
        }
        if (swipeDir === 'vertical') {
          if (restYPercentage > .8) {
            revertSlider(restYPercentage)
            return
          }
        }
      }

      if (swipeDir === 'horizontal') {
        if ((evt.dir === LEFT && isLast) || (evt.dir === RIGHT && isFirst)) {
          revertSlider(restXPercentage)
          return
        }

        if (evt.dir === LEFT) {
          slideHorizontal(NEXT_PHOTO_SLIDER_LEFT(), restXPercentage, next)
          return
        }
        if (evt.dir === RIGHT) {
          slideHorizontal(PREV_PHOTO_SLIDER_LEFT(), restXPercentage, prev)
          return
        }
        revertSlider(restXPercentage)
      }

      if (swipeDir === 'vertical') {
        if (evt.dir === UP) {
          slideVertical(-window.innerHeight, restYPercentage)
          return
        }
        if (evt.dir === DOWN) {
          slideVertical(window.innerHeight, restYPercentage)
          return
        }
        revertSlider(restYPercentage)
      }
    }
  })

  function slideHorizontal(sliderLeft: number, restPercentage: number, callback: () => void) {
    let transitionTime = TRANSITION_SECOND * restPercentage
    _slider.style.transition = `left ${transitionTime}s ease`
    _slider.style.left = sliderLeft + 'px'

    Array.from([_currImg, _prevImg, _nextImg]).forEach(e => {
      if (e) {
        e.style.transition = `all ${transitionTime}s ease`
        e.style.transitionProperty = 'width, left'
        if (e === _currImg) {
          _currImg.style.width = CURR_IMG_SLIDE_WIDTH() + 'px'
          _currImg.style.left = CURR_IMG_SLIDE_LEFT() + 'px'
        }
        if (e === _prevImg) {
          _prevImg.style.width = SIBLING_IMG_SLIDE_WIDTH() + 'px'
          _prevImg.style.left = PREV_IMG_SLIDE_LEFT() + 'px'
        }
        if (e === _nextImg) {
          _nextImg.style.width = SIBLING_IMG_SLIDE_WIDTH() + 'px'
          _nextImg.style.left = NEXT_IMG_SLIDE_LEFT() + 'px'
        }
      }
    })

    waitTransition(() => {
      callback()
      _slider.style.transition = ''
      _slider.style.left = ''

      Array.from([_currImg, _prevImg, _nextImg]).forEach(e => {
        if (e) {
          e.style.transition = ''
          e.style.transitionProperty = ''
          e.style.width = ''
          e.style.left = ''
        }
      })
    }, transitionTime * 1000)
  }

  function slideVertical(imgTop: number, restPercentage: number) {
    let transitionTime = TRANSITION_SECOND * restPercentage
    _currImg.style.transition = `all ${transitionTime}s ease`
    _currImg.style.transitionProperty = 'width, left, top'
    _currImg.style.width = CURR_IMG_CLOSE_WIDTH() + 'px'
    _currImg.style.left = CURR_IMG_CLOSE_LEFT() + 'px'
    _currImg.style.top = imgTop + 'px'

    waitTransition(() => {
      close()
    }, transitionTime * 1000)
  }

  function revertSlider(restPercentage: number) {
    let transitionTime = TRANSITION_SECOND * (1 - restPercentage)
    if (swipeDir === 'horizontal') {
      _slider.style.transition = `left ${transitionTime}s ease`
      _slider.style.left = ''
    }

    _currImg.style.transition = `all ${transitionTime}s ease`
    _currImg.style.transitionProperty = 'width, left, top'
    _currImg.style.width = ''
    _currImg.style.left = ''
    _currImg.style.top = ''

    waitTransition(() => {
      _slider.style.transition = ''

      _currImg.style.transition = ''
      _currImg.style.transitionProperty = ''

      if (_prevImg) {
        _prevImg.style.width = ''
        _prevImg.style.left = ''
      }
      if (_nextImg) {
        _nextImg.style.width = ''
        _nextImg.style.left = ''
      }
    }, transitionTime * 1000)
  }

  function waitTransition(afterTransition: () => void, ms: number) {
    swipeDir = null
    transitioning = true
    setTimeout(() => {
      transitioning = false
      afterTransition()
    }, ms)
  }

  function fileName() {
    if (!hasBrowsed) {
      return ''
    }

    return currPhoto.name.substring(0, 4) + '/' +
           currPhoto.name.substring(4, 6) + '/' +
           currPhoto.name.substring(6, 8) + ' ' +
           currPhoto.name.substring(8, 10) + ':' +
           currPhoto.name.substring(10, 12) + ':' +
           currPhoto.name.substring(12, 14)
  }

  return (
    <div className={'photo' + (hasBrowsed ? '' : ' hide')} onClick={toggleShowInfo} {...swipeHandlers}>
      <div className="slider" ref={c => _slider = c as HTMLDivElement}>
        {
          hasBrowsed && !isFirst
          ?
          <div className="prev-img" ref={c => _prevImg = c as HTMLDivElement}>
            <PhotoLoader name={prevPhoto.name} />
          </div>
          :
          ''
        }
        {
          hasBrowsed
          ?
          <div className="curr-img" ref={c => _currImg = c as HTMLDivElement}>
            <PhotoLoader name={currPhoto.name} />
          </div>
          :
          ''
        }
        {
          hasBrowsed && !isLast
          ?
          <div className="next-img" ref={c => _nextImg = c as HTMLDivElement}>
            <PhotoLoader name={nextPhoto.name} />
          </div>
          :
          ''
        }
      </div>
      <div className={`header` + (showInfo ? '' : ' hide')}>
        <div className="index">{currCount + '/' + totalCount}</div>
        <FontAwesomeIcon className="close" icon={faXmark} onClick={close} />
      </div>
      <div className={`footer` + (showInfo ? '' : ' hide')}>
        <div className="file-name">{fileName()}</div>
      </div>
    </div>
  )
}

export default PhotoBrowse;
