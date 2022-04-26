import FileCount from "../../containers/fileRepo/FileCount";
import VideoList from "../../containers/fileRepo/VideoList";
import "./repo.css";

function VideoRepo() {
  return (
    <div className="video-repo">
      <FileCount />
      <VideoList />
    </div>
  )
}

export default VideoRepo;