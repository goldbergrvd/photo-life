import "./photoBrowse.css"
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PhotoList } from "../types";

export interface Props {
  photoList: PhotoList,
  onClose: () => void
}

function PhotoBrowse({ photoList, onClose }: Props) {
  const photoBrowse = photoList.filter(photo => photo.browsed)[0]

  return (
    <div className={'photo' + (photoBrowse ? '' : ' hide')}>
      <FontAwesomeIcon icon={faXmark} size="2x" onClick={onClose} />
      {photoBrowse ? <img src={`imgs/${photoBrowse.name}`} /> : ''}
    </div>
  )
}

export default PhotoBrowse;