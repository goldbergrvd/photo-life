import "./repo.css";

import PhotoList from "../../containers/fileRepo/PhotoList";
import FileCount from "../../containers/fileRepo/FileCount";
import Pick from "../../containers/fileRepo/Pick";
import Uploader from "../../containers/fileRepo/Uploader";
import ViewPicker from "../../containers/fileRepo/ViewPicker";

function ImageRepo() {
  return (
    <div className="image-repo">
      <PhotoList />
      <FileCount />
      <Uploader />
      <Pick />
      <ViewPicker />
    </div>
  )
}

export default ImageRepo;
