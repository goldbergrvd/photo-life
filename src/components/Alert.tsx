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
  deleteAlbumPhoto: (id: string, photoNames: string[]) => void;
  cancel: () => void;
}


function Alert({ alertState, photoList, videoList, album, deleteMedias, deleteAlbum, deleteAlbumPhoto, cancel }: Props) {

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

    if (alertState === AlertState.DeleteAlbumPhotoCheck) {
      let deletedPhotoNames = album!.photoList.filter(p => p.selected).map(p => p.name)
      deleteAlbumPhoto(album!.id, deletedPhotoNames)
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
      case AlertState.DeleteAlbumPhotoCheck:
        return '刪除相簿照片'
      case AlertState.DeletingMedia:
      case AlertState.DeletingAlbum:
      case AlertState.DeletingAlbumPhoto:
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
