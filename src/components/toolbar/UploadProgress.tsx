import "./uploadProgress.css";
import pikachu from "../../assets/imgs/loading.gif";

interface Props {
  progress: number
}

function UploadProgress({ progress }: Props) {
  return (
    <div className="upload-progress">
      <div className="progress" style={{width: progress + '%'}}>
        <img src={pikachu} alt="" />
      </div>
      <div className="message">上傳中</div>
    </div>
  )
}

export default UploadProgress;
