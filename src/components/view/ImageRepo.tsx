import "./repo.css";

import PhotoList from "../../containers/fileRepo/PhotoList";
import FileCount from "../../containers/fileRepo/FileCount";

function ImageRepo() {
  return (
    <div className="image-repo">
      <PhotoList />
      <FileCount />
    </div>
  )
}

export default ImageRepo;
