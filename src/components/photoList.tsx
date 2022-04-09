import './photoList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { PhotoList, State } from '../types'

export interface Props {
  photoList: PhotoList,
  state: State,
  onTogglePhotoSelect: (index: number) => void
  onOpenPhotoBrowse: (index: number) => void
}

function PhotoListComponent ({ photoList = [], state, onTogglePhotoSelect, onOpenPhotoBrowse }: Props) {

  function onImgClick(i: number) {
    if (state === State.Select) {
      onTogglePhotoSelect(i)
    }

    if (state === State.Browse) {
      onOpenPhotoBrowse(i)
    }
  }

  return (
    <div className="photo-list img-3">
      {
        photoList.map((photo, i) => (
          <div className="img" key={i} onClick={() => onImgClick(i)}>
            <img src={`imgs/${photo.name}`}/>
            { photo.selected ? (<div className="mask"><FontAwesomeIcon icon={faCircleCheck} /></div>) : '' }
          </div>
        ))
      }
    </div>
  )
}

export default PhotoListComponent;
