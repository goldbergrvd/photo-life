import "./repo.css";

import PhotoList from "../../containers/fileRepo/PhotoList";
import FileCount from "../../containers/fileRepo/FileCount";
import ViewPicker from "../../containers/fileRepo/ViewPicker";

function ImageRepo() {
  return (
    <div className="image-repo">
      <PhotoList />
      <FileCount />
      <ViewPicker />
    </div>
  )
}

export default ImageRepo;
