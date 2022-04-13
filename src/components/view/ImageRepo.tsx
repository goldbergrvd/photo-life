import "./imageRepo.css";

import PhotoList from "../../containers/imageRepo/PhotoList";
import PhotoCount from "../../containers/imageRepo/PhotoCount";
import Pick from "../../containers/imageRepo/Pick";
import Uploader from "../imageRepo/Uploader";

function ImageRepo() {
  return (
    <div className="image-repo">
      <PhotoCount />
      <PhotoList />
      <Uploader />
      <Pick />
    </div>
  )
}

export default ImageRepo;
