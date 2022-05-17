import "./repo.css";

import PhotoList from "../../containers/listview/PhotoList";
import ViewPicker from "../../containers/view/ViewPicker";

function ImageRepo() {
  return (
    <div className="image-repo">
      <PhotoList />
      <ViewPicker />
    </div>
  )
}

export default ImageRepo;
