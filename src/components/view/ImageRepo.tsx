import "./imageRepo.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons'

import PhotoList from "../../containers/imageRepo/PhotoList";
import PhotoCount from "../../containers/imageRepo/PhotoCount";
import Pick from '../../containers/settings/Pick';

function ImageRepo() {
  return (
    <div className="image-repo">
      <PhotoCount />
      <PhotoList />
      <div className="uploader">
        <FontAwesomeIcon icon={faFileArrowUp} size="2x" />
        <input id="file" multiple type="file" />
      </div>
      <Pick />
    </div>
  )
}

export default ImageRepo;
