import FileCount from "../../containers/fileRepo/FileCount";
import Pick from "../../containers/fileRepo/Pick";
import Uploader from "../../containers/fileRepo/Uploader";
import VideoList from "../../containers/fileRepo/VideoList";
import "./repo.css";

function VideoRepo() {
  return (
    <div className="video-repo">
      <FileCount />
      <VideoList />
      <Uploader />
      <Pick />
    </div>
  )
}

export default VideoRepo;