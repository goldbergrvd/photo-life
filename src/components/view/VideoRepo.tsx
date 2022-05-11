import FileCount from "../../containers/fileRepo/FileCount";
import VideoList from "../../containers/fileRepo/VideoList";
import Pick from "../../containers/fileRepo/Pick";
import Uploader from "../../containers/fileRepo/Uploader";
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