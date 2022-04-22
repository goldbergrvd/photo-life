import "./Alert.css"
import { Alert as AlertState, PhotoList, VideoList } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";

interface Props {
  alertState: AlertState;
  photoList: PhotoList;
  videoList: VideoList;
  onDelete: (names: string[]) => void;
  onCancel: () => void;
}


function Alert({ alertState, photoList, videoList, onDelete, onCancel }: Props) {

  function onSubmitClick() {
    if (alertState === AlertState.DeletePhotoCheck) {
      const selectedPhotos = photoList.filter(photo => photo.selected)
      onDelete(selectedPhotos.map(photo => photo.name))
    }

    if (alertState === AlertState.DeleteVideoCheck) {
      const selectedVideos = videoList.filter(video => video.selected)
      onDelete(selectedVideos.map(video => video.name))
    }
  }

  function getSubmitBtn() {
    switch (alertState) {
      case AlertState.DeletePhotoCheck:
        return '刪除照片'
      case AlertState.DeleteVideoCheck:
        return '刪除影片'
      case AlertState.AddAlbumCheck:
        return '加入相簿'
      case AlertState.Deleting:
      case AlertState.AddAlbum:
        return <FontAwesomeIcon icon={faRefresh} spin />
    }
  }

  return (
    <div className={'alert' + (alertState === AlertState.None ? ' hide' : '')}>
      <div className="btn">
        <button className="submit" onClick={onSubmitClick}>{getSubmitBtn()}</button>
        <button className="cancel" onClick={onCancel}>取消</button>
      </div>
    </div>
  )
}

export default Alert;
