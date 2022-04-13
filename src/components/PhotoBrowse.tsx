import "./photoBrowse.css"
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Photo } from "../types";

export interface Props {
  photo: Photo | undefined,
  onClose: () => void
}

function PhotoBrowse({ photo, onClose }: Props) {
  return (
    <div className={'photo' + (photo ? '' : ' hide')}>
      <FontAwesomeIcon icon={faXmark} size="2x" onClick={onClose} />
      {photo ? <img src={`imgs/${photo.name}`} /> : ''}
    </div>
  )
}

export default PhotoBrowse;