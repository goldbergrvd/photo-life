import "./pickInfo.css"
import { Alert, PhotoList, Tab } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export interface Props {
  tab: Tab;
  photoList: PhotoList;
  deleteAlert: (alert: Alert) => void;
  pickAlbum: () => void;
}

function PickInfo({ tab, photoList, deleteAlert, pickAlbum }: Props) {
  const amount = photoList.filter(photo => photo.selected).length

  function onDeleteClick() {
    if (tab === Tab.ImageRepo) {
      deleteAlert(Alert.DeletePhotoCheck)
    }

    if (tab === Tab.VideoRepo) {
      deleteAlert(Alert.DeleteVideoCheck)
    }

    if (tab === Tab.Album) {
      deleteAlert(Alert.DeleteAlbumPhotoCheck)
    }
  }

  return (
    <div className="pick-info">
      <div className="pick-album" onClick={pickAlbum}>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </div>
      <div className="info">
        {amount === 0 ? '選取項目' : `已選取${amount}個項目`}
      </div>
      <div className="delete" onClick={onDeleteClick}>
        <FontAwesomeIcon icon={faTrashCan} />
      </div>
    </div>
  )
}

export default PickInfo;
