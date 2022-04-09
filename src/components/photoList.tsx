import './photoList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { PhotoList } from '../types'

export interface Props {
  photoList: PhotoList,
  onTogglePhotoSelect: (index: number) => void
}

function PhotoListComponent ({ photoList = [], onTogglePhotoSelect }: Props) {
  return (
    <div className="photo-list img-3">
      {
        photoList.map((photo, i) => (
          <div className="img" key={i} onClick={() => onTogglePhotoSelect(i)}>
            <img src={`imgs/${photo.name}`}/>
            { photo.selected ? (<div className="mask"><FontAwesomeIcon icon={faCircleCheck} /></div>) : '' }
          </div>
        ))
      }
    </div>
  )
}

export default PhotoListComponent;
