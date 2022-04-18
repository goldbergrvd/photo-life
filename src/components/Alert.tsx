import "./Alert.css"
import { Alert as AlertState, PhotoList } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";

interface Props {
  alertState: AlertState;
  photoList: PhotoList;
  onDeletePhotos: (names: string[]) => void;
  onCancel: () => void;
}


function Alert({ alertState, photoList, onDeletePhotos, onCancel }: Props) {

  function onSubmitClick() {
    const selectedPhotos = photoList.filter(photo => photo.selected)

    if (alertState === AlertState.DeletePhotoCheck) {
      onDeletePhotos(selectedPhotos.map(photo => photo.name))
    }
  }

  function getSubmitBtn() {
    switch (alertState) {
      case AlertState.DeletePhotoCheck:
        return '刪除照片'
      case AlertState.AddAlbumCheck:
        return '加入相簿'
      case AlertState.DeletePhoto:
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
