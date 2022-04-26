import "./photoBrowse.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PhotoList } from "../types";
import { useSwipeable } from "react-swipeable";
import api from "../api";
import { setThemeColor } from "../native-dom";

export interface Props {
  photoList: PhotoList;
  onClose: () => void;
  prevPhotoBrowse: () => void;
  nextPhotoBrowse: () => void;
}

function PhotoBrowse({ photoList, onClose, prevPhotoBrowse, nextPhotoBrowse }: Props) {
  // let _slideContainer: HTMLDivElement;

  const photoIndex = photoList.findIndex(photo => photo.browsed)
  // const screenWidth = window.innerWidth
  // const slideContainerWidth = photoList.length * screenWidth

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => nextPhotoBrowse(),
    onSwipedRight: () => prevPhotoBrowse(),
    onSwipedUp: () => onClose(),
    onSwipedDown: () => onClose(),
    // onSwiping: (evt) => {
    //   let v = -(screenWidth * photoIndex) + evt.deltaX
    //   if (v > 0 || v < -slideContainerWidth + screenWidth) {
    //     return
    //   }
    //   _slideContainer.style.left = v + 'px'
    //   console.log(evt)
    // }
  })

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
      <div className="index">{photoIndex + 1 + '/' + photoList.length}</div>
      {/* {photoIndex === -1 ? '' : (
        <div className="slide-container"
             style={{width: slideContainerWidth, left: -(screenWidth * photoIndex)}}
             ref={c => _slideContainer = c as HTMLDivElement}>
          {
            photoList.map(photo => (
              <img src={`image/${photo.name}`} style={{width: screenWidth}} />
            ))
          }
        </div>
      )} */}
      <FontAwesomeIcon icon={faXmark} size="2x" onClick={onClose} />
      {photoList[photoIndex] ? <img src={api.image(photoList[photoIndex].name)} crossOrigin="anonymous" /> : ''}
      {photoList[photoIndex] ? <div className="file-name">{fileName()}</div> :  ''}
    </div>
  )
}

export default PhotoBrowse;