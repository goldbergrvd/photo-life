import "./repo.css";

import PhotoList from "../../containers/fileRepo/PhotoList";
import FileCount from "../../containers/fileRepo/FileCount";
import Pick from "../../containers/fileRepo/Pick";
import Uploader from "../../containers/fileRepo/Uploader";

function ImageRepo() {
  return (
    <div className="image-repo">
      <FileCount />
      <PhotoList />
      <Uploader />
      <Pick />
    </div>
  )
}

export default ImageRepo;
