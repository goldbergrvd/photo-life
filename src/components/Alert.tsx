import "./alert.css"
import { Album, Alert as AlertState, PhotoList, VideoList } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";

interface Props {
  alertState: AlertState;
  photoList: PhotoList;
  videoList: VideoList;
  album: Album | null;
  deleteMedias: (names: string[]) => void;
  deleteAlbum: (album: Album) => void;
  cancel: () => void;
}


function Alert({ alertState, photoList, videoList, album, deleteMedias, deleteAlbum, cancel }: Props) {

  function onSubmitClick() {
    if (alertState === AlertState.DeletePhotoCheck) {
      const selectedPhotos = photoList.filter(photo => photo.selected)
      deleteMedias(selectedPhotos.map(photo => photo.name))
    }

    if (alertState === AlertState.DeleteVideoCheck) {
      const selectedVideos = videoList.filter(video => video.selected)
      deleteMedias(selectedVideos.map(video => video.name))
    }

    if (alertState === AlertState.DeleteAlbumCheck) {
      deleteAlbum(album!)
    }
  }

  function getSubmitBtn() {
    switch (alertState) {
      case AlertState.DeletePhotoCheck:
        return '刪除照片'
      case AlertState.DeleteVideoCheck:
        return '刪除影片'
      case AlertState.DeleteAlbumCheck:
        return '刪除' + album!.name
      case AlertState.DeletingMedia:
      case AlertState.DeletingAlbum:
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
