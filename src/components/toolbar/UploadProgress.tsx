import "./uploadProgress.css";

interface Props {
  progress: number
}

function UploadProgress({ progress }: Props) {
  return (
    <div className="upload-progress">
      <div className="progress" style={{width: progress + '%'}}></div>
      <div className="message">上傳中</div>
    </div>
  )
}

export default UploadProgress;
