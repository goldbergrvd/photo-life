import "./Alert.css"
import { Album, Alert as AlertState, PhotoList, VideoList } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";

interface Props {
  alertState: AlertState;
  photoList: PhotoList;
  videoList: VideoList;
  album: Album | null;
  deleteFiles: (names: string[]) => void;
  deleteAlbum: (id: number) => void;
  cancel: () => void;
}


function Alert({ alertState, photoList, videoList, album, deleteFiles, deleteAlbum, cancel }: Props) {

  function onSubmitClick() {
    if (alertState === AlertState.DeletePhotoCheck) {
      const selectedPhotos = photoList.filter(photo => photo.selected)
      deleteFiles(selectedPhotos.map(photo => photo.name))
    }

    if (alertState === AlertState.DeleteVideoCheck) {
      const selectedVideos = videoList.filter(video => video.selected)
      deleteFiles(selectedVideos.map(video => video.name))
    }

    if (alertState === AlertState.DeleteAlbumCheck) {
      deleteAlbum(album!.id)
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
      case AlertState.DeleteAlbumCheck:
        return '刪除' + album!.name
      case AlertState.Deleting:
      case AlertState.AddAlbum:
      case AlertState.DeleteAlbum:
        return <FontAwesomeIcon icon={faRefresh} spin />
    }
  }

  return (
    <div className={'alert' + (alertState === AlertState.None ? ' hide' : '')}>
      <div className="btn">
        <button className="submit" onClick={onSubmitClick}>{getSubmitBtn()}</button>
        <button className="cancel" onClick={cancel}>取消</button>
      </div>
    </div>
  )
}

export default Alert;
